import { reactive } from 'vue'
import { db } from '@/config/firebase.js'
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

export const memberStore = reactive({
  members: [],
  
  init() {
    const membersRef = collection(db, 'members')
    onSnapshot(membersRef, (snapshot) => {
      this.members = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  },
  
  async addMember(member) {
    await addDoc(collection(db, 'members'), {
      name: member.name,
      role: member.role,
      photo: member.photo,
      createdAt: new Date().toISOString()
    })
  },
  
  async removeMember(id) {
    await deleteDoc(doc(db, 'members', id))
  }
})

memberStore.init()