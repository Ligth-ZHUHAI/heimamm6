// 导入Vue
import Vue from 'vue';

// 导入VueRouter
import VueRouter from 'vue-router';

// 注册VueRouter
Vue.use(VueRouter);

// 导入login组件
import login from '@/view/login/login.vue'

// 实例化路由
let router = new VueRouter({
    routes:[
        {
            path:'/',
            component: login
        },
    ]
})

export default router;



