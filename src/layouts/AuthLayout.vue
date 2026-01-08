<template>
  <div class="auth-layout">
    <Sidebar v-model="sidebarOpen">
      <template #navigation>
        <router-link to="/login" class="sidebar__link">Login</router-link>
        <router-link to="/register" class="sidebar__link">Register</router-link>
        <router-link to="/" class="sidebar__link">Back to Home</router-link>
      </template>
    </Sidebar>
    
    <div class="auth-content">
      <button @click="sidebarOpen = !sidebarOpen" class="auth-menu-toggle">☰</button>
      <slot />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/common/Sidebar.vue'

export default {
  name: 'AuthLayout',
  components: {
    Sidebar
  },
  data() {
    return {
      sidebarOpen: false
    }
  }
}
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: #ecf0f1;
}

.auth-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.auth-menu-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: #3498db;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  z-index: 999;
}
</style>