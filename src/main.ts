import { createApp } from "vue";
import "./style.css";
import router from "./utils/router";
import App from "./App.vue";
import { createApiKey } from "./services/AuthenticationServices";



createApiKey();

createApp(App).use(router).mount("#app");

