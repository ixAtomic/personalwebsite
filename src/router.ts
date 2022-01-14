import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage.vue";
import About from "./components/About.vue";
import Blog from "./components/Blog.vue";
import Contact from "./components/Contact.vue";

Vue.use(Router);

export default new Router({
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
            path: "/contact",
            name: "contact",
            component: Contact
        }
    ]
})

