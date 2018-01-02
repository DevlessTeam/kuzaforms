import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import Analytics from '@/components/Analytics'
import Items from '@/components/Items'
import FormView from '@/components/FormView'
import Meal from '@/components/Meal'
import Login from '@/components/Login'
import Register from '@/components/Register'
import FormEdit from '@/components/FormEdit'
import DataForm from '@/components/DataForm'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: 'menu',
          name: 'Analytics',
          component: Analytics
        },
        {
          path: '/items',
          name: 'Items',
          component: Items
        },
        {
          path: '/forms/:id',
          name: 'DataForm',
          component: DataForm
        },
        {
          path: '/forms/:id/view',
          name: 'FormView',
          component: FormView
        },
        {
          path: '/forms/:id/edit',
          name: 'FormEdit',
          component: FormEdit
        },
        {
          path: '/meals',
          name: 'Meal',
          component: Meal
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      component: NotFoundComponent
    },
  ]
})

export default router
