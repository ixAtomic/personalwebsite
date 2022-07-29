
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "./components/MainPage.vue";
import About from "./components/About.vue";
import Blog from "./components/Blog.vue";
import Contact from "./components/Contact.vue";
import BlogPost from "./components/BlogPost.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: MainPage
        },
        {
            path: "/about",
            name: "about",
            component: About
        },
        {
            path: "/blog",
            name: "blog",
            component: Blog
        },
        {
            path: "/blogpost",
            name: "blogpost",
            props(route){
                return { BlogID: route.query.BlogID }
            },
            component: BlogPost
        },
        {
            path: "/contact",
            name: "contact",
            component: Contact
        }
    ],
})

export default router

