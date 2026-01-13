import { reactive } from 'vue'

// Load advisories from localStorage or use empty array
const savedAdvisories = JSON.parse(localStorage.getItem('purok-advisories') || '[]')

export const advisoryStore = reactive({
  advisories: savedAdvisories,
  
  addAdvisory(advisory) {
    const newAdvisory = {
      id: Date.now(),
      title: advisory.title,
      content: advisory.content,
      date: new Date().toLocaleDateString()
    }
    this.advisories.push(newAdvisory)
    this.saveToStorage()
  },
  
  removeAdvisory(id) {
    this.advisories = this.advisories.filter(advisory => advisory.id !== id)
    this.saveToStorage()
  },
  
  saveToStorage() {
    localStorage.setItem('purok-advisories', JSON.stringify(this.advisories))
  }
})