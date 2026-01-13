import { reactive } from 'vue'

export const adminStore = reactive({
  isAuthenticated: false,
  
  login() {
    this.isAuthenticated = true
  },
  
  logout() {
    this.isAuthenticated = false
  }
})