import "./styles/index.scss"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'el-cool'
import 'el-cool/dist/index.css'
import { createPinia } from 'pinia'

const pinia = createPinia()


const app = createApp(App)
app.use(router)
    .use(ElementPlus)
    .use(pinia)


app.mount('#app')
