import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import Analytics from '@/components/Analytics'
import Forms from '@/components/Forms'
import FormView from '@/components/FormView'
import Plugins from '@/components/Plugins'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
      path: '/analytics',
      name: 'Analytics',
      component: Analytics
    },
    {
      path: '/forms',
      name: 'Forms',
      component: Forms
    },
    {
      path: '/forms/:id',
      name: 'ViewForm',
      component: FormView
    },
    {
      path: '/plugins',
      name: 'Plugins',
      component: Plugins
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
