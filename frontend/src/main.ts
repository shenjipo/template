import "./styles/index.scss"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'el-cool'
import 'el-cool/dist/index.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const pinia = createPinia()


const app = createApp(App)
app.use(router)
    .use(ElementPlus)
    .use(pinia)

ElementPlus.CommonUtils.InitUtils(app._context)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
