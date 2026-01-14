<template>
  <div class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <div class="sidebar__header">
      <h3>Informations</h3>
    </div>
    <nav class="sidebar__nav">
      <slot name="navigation">
        <router-link to="/" class="sidebar__link">
          <q-icon name="home" class="sidebar__icon" />
          Home
        </router-link>
        <router-link to="/mvg" class="sidebar__link">
          <q-icon name="business" class="sidebar__icon" />
          MVG
        </router-link>
        <router-link to="/about" class="sidebar__link">
          <q-icon name="info" class="sidebar__icon" />
          About
        </router-link>
        <router-link to="/members" class="sidebar__link">
          <q-icon name="group" class="sidebar__icon" />
          Members
        </router-link>
        <router-link to="/advisory" class="sidebar__link">
          <q-icon name="campaign" class="sidebar__icon" />
          Advisory
        </router-link>
        <router-link to="/admin" class="sidebar__link">
          <q-icon name="admin_panel_settings" class="sidebar__icon" />
          Admin
        </router-link>
      </slot>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    isOpen: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: #2c3e50;
  color: white;
  transition: left 0.3s ease;
  z-index: 1000;
  font-family: 'Old English Text MT', 'Blackletter', serif;
}

.sidebar--open {
  left: 0 !important;
}

.sidebar__header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #34495e;
}

.sidebar__header h3 {
  font-size: 2rem;
  margin: 0;
}

.sidebar__nav {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar__link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.5rem 2rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  width: 80%;
  border-radius: 4px;
  font-size: 1.4rem;
  font-weight: 500;
  border-bottom: 1px solid #34495e;
  gap: 1rem;
}

.sidebar__icon {
  font-size: 1.4rem;
  min-width: 2rem;
}

.sidebar__link:hover {
  background: #3498db;
  transform: translateX(10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.sidebar__link:last-child {
  border-bottom: none;
}

.sidebar__link:hover {
  background: #34495e;
}

@media (max-width: 768px) {
  .sidebar {
    width: 250px;
    left: -250px;
  }
  
  .sidebar--open {
    left: 0 !important;
  }
  
  .sidebar__header h3 {
    font-size: 1.5rem;
  }
  
  .sidebar__link {
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
  }
  
  .sidebar__icon {
    font-size: 1.1rem;
  }
}
</style>