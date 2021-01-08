import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Forget from "@/pages/Forget";
import Detail from "@/pages/Detail";
import MyOrder from "@/pages/MyOrder";

Vue.use(Router)

export default new Router({
    routes :[
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/forget',
            name: 'forget',
            component: Forget
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail
        },
        {
            path: '/my-order',
            name: 'my-order',
            component: MyOrder
        }
    ]
})