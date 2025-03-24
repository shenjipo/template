## 源码

[前端ng容器](https://github.com/shenjipo/docker-frontend)

[后端node容器+mysql容器](https://github.com/shenjipo/docker-backend)

[前后端应用模板](https://github.com/shenjipo/template)

## 背景

在[博客重构](http://101.133.143.249/Blog/#/PreviewPc/PreviewBlog/5f35a915-01f0-4fe3-989f-6f6bcf4712b0)这篇文章介绍了使用docker容器来部署前后端应用，解决系统迁移时安装部署繁琐的问题，但是这篇文章中使用的docker部署方式只适用于部署单个前后端应用，如果有多个前后端应用需要部署，那么需要使用80之外的端口，不符合用户使用习惯，因此，本文对部署方式做了进一步的优化，能够使用docker在80端口下快速部署多个应用。

## 方法介绍

本文docker部署结构图如下

![image_500081f8d81ec751918fc41d2431fc0c.png](http://101.133.143.249/blog-api/getImage/image_500081f8d81ec751918fc41d2431fc0c.png)

其中，所有应用的静态资源和一个ng镜像打包成为一个新的镜像，这个新的镜像启动时会把ng的80端口映射到宿主机的80端口，根据用户的请求路径来区分请求的时哪个项目的静态资源或者后端服务。

所有应用的后端分别与一个node镜像打包成为一个新的镜像，在`docker-compose.yml`文件中配置每个镜像都映射不同的宿主机端口，例如blog后端映射到3000，workbench后端映射到3001，依次类推。如果需要持久化保存一些图片，需要在`docker-compose.yml`文件中配置图片文件映射文件

然后再打包一个mysql镜像，在docker-compose.yml文件中配置mysql的3306端口映射到宿主机的3306端口，配置数据文件映射到宿主机的某个文件夹，配置启动时自动执行的脚本，来生成初始的数据表结构和数据

**注意，mysql8.0的启动脚本需要加入以下两行代码，不然执行node后端作为客户都去执行sql语句时会报错**

```
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'xxx';  
FLUSH PRIVILEGES;
```

2个后端镜像和1个mysql镜像组成一个`app-network`容器网络，使用`doccker-compose.yml`文件配置启动方式，使得后端应用能够直接连上mysql数据库

下面是两个比较复杂的配置文件内容，其它的配置文件请参考源码部分

**nginx.conf配置文件**

```
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
  
        location /WangLove {
                alias /usr/share/nginx/html/WangLove/dist/;
        }

        location /Blog {
                alias /usr/share/nginx/html/Blog/dist/;
        }
  
        location /blog-api/ {  
            proxy_pass http://101.133.143.249:3000/api/;   
            proxy_set_header Host $host;  
            proxy_set_header X-Real-IP $remote_addr;  
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
            proxy_set_header X-Forwarded-Proto $scheme;  

            add_header 'Access-Control-Allow-Origin' '*';  
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';  
        }

        location /Template {
                alias /usr/share/nginx/html/Template/dist/;
        }

        location /template-api/ {  
            proxy_pass http://101.133.143.249:3001/api/;   
            proxy_set_header Host $host;  
            proxy_set_header X-Real-IP $remote_addr;  
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
            proxy_set_header X-Forwarded-Proto $scheme;  

            add_header 'Access-Control-Allow-Origin' '*';  
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';  
        }

  
        location / {  
                try_files $uri $uri/ /index.html;  
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
}
```

**docker.compose.yml配置文件**

```
xxservices:
  mysql:
    image: server-mysql-image:latest
    container_name: mysql-container
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: xxx
      MYSQL_DATABASE: blog
    volumes:
      - ./data/mysql:/var/lib/mysql
      - ./db-init-scripts:/docker-entrypoint-initdb.d/
    networks:
      - app-network

  blog-node:
    image: blog-node-image:latest
    container_name: blog-node-container
    volumes:
      - ./data/assets:/usr/src/app/assets
    ports:
      - "3000:3000"
    depends_on:
      - mysql
    networks:
      - app-network
    environment:
      DB_HOST: mysql
      DB_USER: root
      DB_PASSWORD: xxx
      DB_NAME: blog

  template-node:
    image: template-node-image:latest
    container_name: template-node-container
    ports:
      - "3001:3000"
    depends_on:
      - mysql
    networks:
      - app-network
    environment:
      DB_HOST: mysql
      DB_USER: root
      DB_PASSWORD: xxx
      DB_NAME: blog

networks:
  app-network:
    driver: bridge
```
