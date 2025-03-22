import express, { Express } from "express"
import jwt from "jsonwebtoken";
const jwtScrect = 'login2021';  //签名
import multer from "multer";

const init = (app: Express) => {


    app.use(multer({ dest: "./assets/upload/temp" }).single('file[]'))
    app.use(express.json())
    //开放跨域请求
    app.use((req, res, next) => {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", "*");
        //允许的header类型
        res.header("Access-Control-Allow-Headers", "*");
        //跨域允许的请求方式
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
        if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
        else next();
    });

    // 权限拦截 noAuthorityPathList中的请求不拦截
    const noAuthorityPathList = ['login']
    app.use((req, res, next) => {
        const reqPath = req.path
        const find = noAuthorityPathList.find(item => reqPath.includes(item))
        if (find) {
            next()
            return
        }

        const token = req.headers['authorization']
        if (!token) {
            res.send({
                code: 403,
                msg: "用户未登录，自动跳转登录!",
                data: {}
            })
            return
        }

        jwt.verify(token, jwtScrect, (err, user: any) => {
            if (err) {
                res.send({
                    code: 403,
                    msg: "sessionTick校验失败!",
                    data: {}
                })
                return
            }

            req.user = user

            next()
        })

    });
}

export default init