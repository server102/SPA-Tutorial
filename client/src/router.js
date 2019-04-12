import Vue from 'vue'
import store from './store/store'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Trade from './views/Trade.vue'
import Bot from './views/Bot.vue'
import Statistics from './views/Statistics.vue'
import Settings from './views/Settings.vue'
import Help from './views/Help.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (!store.state.isUserLoggedIn) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade,
      beforeEnter: (to, from, next) => {
        if (!store.state.isUserLoggedIn) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/bot',
      name: 'bot',
      component: Bot,
      beforeEnter: (to, from, next) => {
        if (!store.state.isUserLoggedIn) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      beforeEnter: (to, from, next) => {
        if (!store.state.isUserLoggedIn) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: (to, from, next) => {
        if (!store.state.isUserLoggedIn) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
      beforeEnter: (to, from, next) => {
        if (!store.state.isUserLoggedIn) {
          next('/login')
        } else {
          next()
        }
      }
    }
  ]
})
