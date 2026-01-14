<template>
  <div class="about">
    <div class="about-header">
      <h1>{{ content.title }}</h1>
    </div>
    <div class="about-content">
      <p>{{ content.content }}</p>
    </div>
  </div>
</template>

<script>
import { contentStore } from '@/store/content.js'

export default {
  name: 'About',
  computed: {
    content() {
      return contentStore.about
    }
  }
}
</script>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e9ecef;
}

.about-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
}

.about-content {
  text-align: center;
  font-size: 1.2rem;
  color: #6c757d;
  line-height: 1.8;
}
</style>