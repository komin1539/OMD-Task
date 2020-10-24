const routes = [
    {
        path: "/",
        name: "authorization",
        meta: {requiresAuth: false},
        component: () => import("./components/Authorization.vue"),
    },
    {
        path: "/data",
        meta: {requiresAuth: true},
        name: "data",
        component: () => import("./components/DataVisualization.vue"),
    }
];

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router =new VueRouter({ routes: routes, mode: "history" });
export default router;
