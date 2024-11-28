import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomeIndex.vue';
import MasterDetail from './views/MasterDetail.vue';
import HubAndSpoke from './views/HubAndSpoke.vue';

const routes = [
    { path: "/", name: "HomeIndex", component: Home},
    { path: "/master-detail", name: "MasterDetail", component: MasterDetail},
    { path: "/hub-and-spoke", name: "HubAndSpoke", component: HubAndSpoke}
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

const app = createApp(App);
app.use(router);
app.mount("#app");
