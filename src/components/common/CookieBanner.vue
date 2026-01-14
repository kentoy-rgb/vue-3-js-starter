<template>
  <div v-if="showBanner" class="cookie-banner">
    <div class="cookie-content">
      <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
      <div class="cookie-actions">
        <button @click="acceptCookies" class="btn-accept">Accept All</button>
        <button @click="declineCookies" class="btn-decline">Decline</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '@/config/firebase'
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'CookieBanner',
  setup() {
    const showBanner = ref(false)

    onMounted(() => {
      const consent = localStorage.getItem('cookieConsent')
      if (!consent) {
        showBanner.value = true
      }
    })

    const saveToFirebase = async (consent) => {
      try {
        await addDoc(collection(db, 'cookieConsents'), {
          consent,
          timestamp: new Date(),
          userAgent: navigator.userAgent
        })
      } catch (error) {
        console.error('Error saving consent:', error)
      }
    }

    const acceptCookies = async () => {
      localStorage.setItem('cookieConsent', 'accepted')
      await saveToFirebase('accepted')
      showBanner.value = false
    }

    const declineCookies = async () => {
      localStorage.setItem('cookieConsent', 'declined')
      await saveToFirebase('declined')
      showBanner.value = false
    }

    return {
      showBanner,
      acceptCookies,
      declineCookies
    }
  }
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2c3e50;
  color: white;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.cookie-content p {
  margin: 0;
  flex: 1;
  min-width: 250px;
}

.cookie-actions {
  display: flex;
  gap: 0.5rem;
}

.cookie-actions button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

.cookie-actions button:hover {
  opacity: 0.9;
}

.btn-accept {
  background: #42b983;
  color: white;
}

.btn-decline {
  background: transparent;
  color: white;
  border: 1px solid white;
}
</style>
