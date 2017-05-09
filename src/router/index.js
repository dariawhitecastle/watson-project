import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Poem from '@/components/Poem'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/poem',
      name: 'Poem',
      component: Poem
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
