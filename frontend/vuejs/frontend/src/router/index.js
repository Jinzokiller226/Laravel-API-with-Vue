import { createRouter, createWebHistory } from 'vue-router'
import error401 from '@/views/errror401.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/auth/Dashboard.vue'
import Roles from '@/views/auth/appmanage/Roles.vue'
import Analytics from '@/views/auth/Analytics.vue'
import Users from '@/views/auth/appmanage/Users.vue'
import Doctors from '@/views/auth/appmanage/Doctors.vue'
import PatientList from '@/views/auth/patientmanage/PatientList.vue'
import Category from '@/views/auth/appmanage/Category.vue'
import Branch from '@/views/auth/appmanage/Branch.vue'
import ScheduleBoard from '@/views/auth/scheduling/scheduleboard.vue'

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

          path:'patientlist',
          name:'patientList',
          component: PatientList
        },
          {

          path:'scheduleboard',
          name:'ScheduleBoard',
          component: ScheduleBoard
        },
        {

          path:'roles',
          name:'Roles',
          component: Roles
        },
        {

          path:'doctors',
          name:'Doctors',
          component: Doctors
        },
         {

          path:'category',
          name:'Category',
          component: Category
        },
         {

          path:'branch',
          name:'Branch',
          component: Branch
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
