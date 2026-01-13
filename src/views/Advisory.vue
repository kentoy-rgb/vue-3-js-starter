<template>
  <div class="advisory">
    <div class="advisory-header">
      <h1>Purok Advisory</h1>
      <p>Important announcements and updates for Purok Lapad Bato community</p>
    </div>
    
    <div class="advisory-container">
      <div v-if="advisories.length === 0" class="no-advisories">
        <div class="empty-state">
          <div class="empty-icon">📢</div>
          <h3>No Advisories Yet</h3>
          <p>Check back later for community announcements and updates.</p>
        </div>
      </div>
      
      <div v-else class="advisory-grid">
        <div v-for="advisory in advisories" :key="advisory.id" class="advisory-card">
          <div class="card-header">
            <h3>{{ advisory.title }}</h3>
            <span class="advisory-date">{{ advisory.date }}</span>
          </div>
          <div class="card-content">
            <p>{{ advisory.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { advisoryStore } from '@/store/advisory.js'

export default {
  name: 'Advisory',
  computed: {
    advisories() {
      return advisoryStore.advisories
    }
  }
}
</script>

<style scoped>
.advisory {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.advisory-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e9ecef;
}

.advisory-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.advisory-header p {
  color: #6c757d;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.advisory-container {
  min-height: 400px;
}

.no-advisories {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.empty-state {
  text-align: center;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #495057;
  margin-bottom: 0.5rem;
}

.advisory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.advisory-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
}

.advisory-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 1.5rem;
  position: relative;
}

.card-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.advisory-date {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.card-content {
  padding: 1.5rem;
}

.card-content p {
  color: #495057;
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .advisory {
    padding: 1rem;
  }
  
  .advisory-header h1 {
    font-size: 2rem;
  }
  
  .advisory-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>