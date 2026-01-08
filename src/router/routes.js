import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Services from '@/views/Services.vue'
import Contact from '@/views/Contact.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'

export default [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/services', component: Services },
  { path: '/contact', component: Contact },
  { path: '/profile', component: Profile },
  { path: '/settings', component: Settings },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)*', component: NotFound }
]