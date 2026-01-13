import { reactive } from 'vue'

export const memberStore = reactive({
  members: [],
  
  addMember(member) {
    this.members.push({
      id: Date.now(),
      name: member.name,
      role: member.role,
      photo: member.photo
    })
  },
  
  removeMember(id) {
    this.members = this.members.filter(member => member.id !== id)
  }
})