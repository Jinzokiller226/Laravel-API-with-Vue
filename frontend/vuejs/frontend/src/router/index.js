import { createRouter, createWebHistory } from 'vue-router'
import error401 from '@/views/errror401.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/auth/Dashboard.vue'
import Roles from '@/views/auth/appmanage/Roles.vue'
import Analytics from '@/views/auth/Analytics.vue'
import Users from '@/views/auth/appmanage/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
     {
      path: '/register',
      name: 'Register',
      component: Register,
    },
     {
      path: '/login',
      name: 'Login',
      component: Login,
    },
     {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children : [
        {
          path:'',
          name:'analytics',
          component: Analytics
        },
        {

          path:'roles',
          name:'Roles',
          component: Roles
        },
        {

          path:'users',
          name:'Users',
          component: Users
        }
      ]
    },
      {
      path: '/error401',
      name: 'error401',
      component: error401,
    },
   
   
  ],
})

export default router
