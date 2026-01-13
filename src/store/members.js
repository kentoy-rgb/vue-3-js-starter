import { reactive } from 'vue'

// Load members from localStorage or use empty array
const savedMembers = JSON.parse(localStorage.getItem('purok-members') || '[]')

export const memberStore = reactive({
  members: savedMembers,
  
  addMember(member) {
    const newMember = {
      id: Date.now(),
      name: member.name,
      role: member.role,
      photo: member.photo
    }
    this.members.push(newMember)
    this.saveToStorage()
  },
  
  removeMember(id) {
    this.members = this.members.filter(member => member.id !== id)
    this.saveToStorage()
  },
  
  saveToStorage() {
    localStorage.setItem('purok-members', JSON.stringify(this.members))
  }
})