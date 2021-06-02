import {createApp} from 'vue'
import store from "core-js";
import router from "./router";
import App from "./App";

createApp(App).use(store).use(router).mount('#app');
