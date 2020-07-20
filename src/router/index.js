import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminComponents/AdminLogin'
import AdminUser from '@/components/AdminComponents/AdminUser'
import Register from '@/components/Register'
import Userinfo from '@/components/Userinfo'
import Message from '@/components/Message'
import News from '@/components/News'
import Hope from '@/components/Hope'
import Encyclopedias from '@/components/Encyclopedias'
import Adoption from '@/components/Adoption'
import PublishOut from '@/components/PublishOut'
import PublishAdoption from '@/components/PublishAdoption'
import PublishFindAni from '@/components/PublishFindAni'
import PublishFindUser from '@/components/PublishFindUser'
import Back from '@/components/Back'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin_login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin_user',
      name: 'AdminUser',
      component: AdminUser
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/userinfo',
      name: 'Userinfo',
      component: Userinfo
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/encyclopedias',
      name: 'Encyclopedias',
      component: Encyclopedias
    },
    {
      path: '/adoption',
      name: 'Adoption',
      component: Adoption
    },
    {
      path: '/publishOut',
      name: 'PublishOut',
      component: PublishOut
    },
    {
      path: '/publishAdoption',
      name: 'PublishAdoption',
      component: PublishAdoption
    },
    {
      path: '/publishFindAni',
      name: 'PublishFindAni',
      component: PublishFindAni
    },
    {
      path: '/publishFindUser',
      name: 'PublishFindUser',
      component: PublishFindUser
    },
    {
      path: '/hope',
      name: 'Hope',
      component: Hope
    },
    {
      path: '/back',
      name: 'Back',
      component: Back
    },
    {
      path: '/',
      redirect:'/login'
    }
  ]
})
