import { createApp } from 'vue'
import './style.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from './App.vue'
import router from "./router/index.js";
import store from "./store/index.js";



const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);



app.mount("#app");