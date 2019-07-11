import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/message/message')
    }, {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my/my')
    }, {
      path: '/friend',
      name: 'friend',
      component: () => import('@/views/friend/friend')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/register')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/chat/chat')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/my/profile')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('@/views/tools/weather')
    },
    {
      path: '/express',
      name: 'express',
      component: () => import('@/views/tools/express')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/about')
    },
    {
      path: '/robot',
      name: 'robot',
      component: () => import('@/views/robot/robot')
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('@/views/collect/collect')
    },
    {
      path: '/detailed',
      name: 'detailed',
      component: () => import('@/views/collect/detailed')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/search')
    },
    {
      path: '*',
      redirect: '/message'
    }
  ]
})
