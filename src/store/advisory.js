import { reactive } from 'vue'

export const advisoryStore = reactive({
  advisories: [],
  
  addAdvisory(advisory) {
    this.advisories.push({
      id: Date.now(),
      title: advisory.title,
      content: advisory.content,
      date: new Date().toLocaleDateString()
    })
  },
  
  removeAdvisory(id) {
    this.advisories = this.advisories.filter(advisory => advisory.id !== id)
  }
})