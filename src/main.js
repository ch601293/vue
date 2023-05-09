import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import login from "./components/login.vue";
import index from "./views/index.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: login,
  },
  { path: "/user", component: index },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App);
app.mount("#app");
app.use(ElementPlus);
app.use(router);
app.component("login", login);
