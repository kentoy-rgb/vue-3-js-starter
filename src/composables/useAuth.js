import { ref } from 'vue'

export function useAuth() {
  const user = ref(null)
  const isAuthenticated = ref(false)

  return {
    user,
    isAuthenticated
  }
}