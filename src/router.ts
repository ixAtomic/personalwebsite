
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "home", component: () => import('./App.vue') },
        { path: "", component: () => import("./pages/MainPage.vue") },
        { path: "/about", name: "about", component: () => import("./pages/About.vue")},
        { path: "/blog", name: "blog", component: () => import("./pages/Blog.vue")},
        { path: "/blogpost", name: "blogpost", props(route){ return { BlogID: route.query.BlogID } }, component: () => import("./pages/BlogPost.vue")},
        { path: "/contact", name: "contact",  component: () => import("./pages/Contact.vue")}
    ],
});

