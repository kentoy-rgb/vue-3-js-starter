import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Members from '@/views/Members.vue'
import Admin from '@/views/Admin.vue'
import NotFound from '@/views/NotFound.vue'

export default [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/members', component: Members },
  { path: '/admin', component: Admin },
  { path: '/:pathMatch(.*)*', component: NotFound }
]