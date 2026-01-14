import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Members from '@/views/Members.vue'
import Advisory from '@/views/Advisory.vue'
import Admin from '@/views/Admin.vue'
import MVG from '@/views/MVG.vue'
import NotFound from '@/views/NotFound.vue'

export default [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/mvg', component: MVG },
  { path: '/members', component: Members },
  { path: '/advisory', component: Advisory },
  { path: '/admin', component: Admin },
  { path: '/:pathMatch(.*)*', component: NotFound }
]