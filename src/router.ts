import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage.vue";
import About from "./components/About.vue";

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
        }
    ]
})

