<template>
  <div class="default-layout">
    <header class="layout-header" :class="{ 'header--shifted': sidebarOpen && !isAdminAuthenticated }">
      <button v-if="!isAdminAuthenticated" @click="sidebarOpen = !sidebarOpen" class="menu-toggle">☰</button>
      <img src="/logo.png" alt="Purok Lapad Bato Logo" class="logo" />
    </header>
    
    <Sidebar v-if="!isAdminAuthenticated" v-model="sidebarOpen" />
    
    <main class="layout-content" :class="{ 'content--shifted': sidebarOpen && !isAdminAuthenticated }">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>

<script>
import Sidebar from '@/components/common/Sidebar.vue'
import Footer from '@/components/common/Footer.vue'
import { adminStore } from '@/store/admin.js'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    Footer
  },
  data() {
    return {
      sidebarOpen: false
    }
  },
  computed: {
    isAdminAuthenticated() {
      return adminStore.isAuthenticated
    }
  }
}
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #3498db;
  color: white;
  gap: 1rem;
  height: 60px;
  box-sizing: border-box;
  transition: margin-left 0.3s ease;
}

.header--shifted {
  margin-left: 300px;
}

.layout-header h1 {
  font-size: 1.2rem;
  margin: 0;
  font-family: 'Old English Text MT', 'Blackletter', serif;
  font-weight: normal;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
}

.logo {
  height: 40px;
  object-fit: contain;
}

.layout-content {
  flex: 1;
  padding: 2rem;
  transition: margin-left 0.3s ease;
}

.content--shifted {
  margin-left: 300px;
}

@media (max-width: 768px) {
  .layout-header {
    padding: 0.75rem;
  }
  
  .header--shifted {
    margin-left: 0;
  }
  
  .logo {
    height: 30px;
  }
  
  .layout-content {
    padding: 1rem;
  }
  
  .content--shifted {
    margin-left: 0;
  }
}
</style>