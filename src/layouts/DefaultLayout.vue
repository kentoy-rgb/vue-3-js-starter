<template>
  <div class="default-layout">
    <header class="layout-header" :class="{ 'header--shifted': sidebarOpen }">
      <button @click="sidebarOpen = !sidebarOpen" class="menu-toggle">☰</button>
      <h1>Purok Lapad Bato</h1>
    </header>
    
    <Sidebar v-model="sidebarOpen" />
    
    <main class="layout-content" :class="{ 'content--shifted': sidebarOpen }">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>

<script>
import Sidebar from '@/components/common/Sidebar.vue'
import Footer from '@/components/common/Footer.vue'

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

.layout-content {
  flex: 1;
  padding: 2rem;
  transition: margin-left 0.3s ease;
}

.content--shifted {
  margin-left: 300px;
}
</style>