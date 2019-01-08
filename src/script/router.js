import Vue from 'vue'
import Router from 'vue-router';
import VueRouter from 'vue-router';

import index from '../components/Index.vue'
import HelloWorld from '../components/HelloWorld'
import NewView from '../components/NewView.vue'
import register from '../components/register.vue'
import Login from '../components/Login.vue'



Vue.use(Router)

const routes = [
    {path: '/',component: index},
    {path: '/HelloWorld',component: HelloWorld },
    {path: '/NewView/:id',component: NewView },
    {path: '/register',component: register },
    {path: '/Login',component: Login }
]


const router = new VueRouter({
  routes,
  base:'/dist/',
  mode:"history"
})


export default router