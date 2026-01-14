<template>
  <div class="default-layout">
    <div v-if="sidebarOpen && !isAdminAuthenticated" class="overlay" @click="closeSidebar"></div>
    
    <header class="layout-header" :class="{ 'header--shifted': sidebarOpen && !isAdminAuthenticated }">
      <button 
        v-if="!isAdminAuthenticated" 
        @click="toggleSidebar" 
        @touchend.prevent="toggleSidebar"
        class="menu-toggle"
      >☰</button>
      <img src="/logo.png" alt="Purok Lapad Bato Logo" class="logo" />
    </header>
    
    <Sidebar v-if="!isAdminAuthenticated" v-model="sidebarOpen" />
    
    <main class="layout-content" :class="{ 'content--shifted': sidebarOpen && !isAdminAuthenticated }">
      <slot />
    </main>
    
    <Footer :class="{ 'footer--shifted': sidebarOpen && !isAdminAuthenticated }" />
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
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    closeSidebar() {
      this.sidebarOpen = false
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
  position: relative;
  z-index: 1001;
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
  font-size: 2rem;
  cursor: pointer;
  padding: 0.75rem;
  line-height: 1;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.3);
  user-select: none;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.footer--shifted {
  margin-left: 300px;
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .layout-header {
    padding: 0.75rem;
  }
  
  .header--shifted {
    margin-left: 250px;
  }
  
  .menu-toggle {
    font-size: 2.5rem;
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
  
  .footer--shifted {
    margin-left: 250px;
  }
}
</style>