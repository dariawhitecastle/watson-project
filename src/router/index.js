import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Poem from '@/components/Poem'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
    }
  ]
})
