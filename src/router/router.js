import {
    createRouter,
    createWebHistory,
} from "vue-router";

// Pages
import Home from "@pages/Home.vue";

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: {
            pageTitle: 'главная',
        },
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

export default router;
