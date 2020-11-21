import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import LogIn from '@/components/LogIn.vue'
import ChangePassword from '@/components/changePassword.vue'
import SignUp from '@/components/SignUp.vue'
import Home from '@/components/Home.vue'
// import { store } from '@/store'

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/')
// }

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        title: 'داشبورد'
      }
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'فراموشی رمز عبور'
      }
    },
    {  path: '/Login',
    name: 'login',
    component: LogIn
    },
    {  path: '/ChangePassword',
    name: 'changePassword',
    component: ChangePassword
    },
    {  path: '/SignUp',
    name: 'signup',
    component: SignUp
    },
    {  path: '/Home',
    name: 'Home',
    component: Home
    }


  ]
})
