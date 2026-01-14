import { reactive } from 'vue'
import { db } from '@/config/firebase.js'
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

export const advisoryStore = reactive({
  advisories: [],
  
  init() {
    const advisoriesRef = collection(db, 'advisories')
    onSnapshot(advisoriesRef, (snapshot) => {
      this.advisories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    })
  },
  
  async addAdvisory(advisory) {
    await addDoc(collection(db, 'advisories'), {
      title: advisory.title,
      content: advisory.content,
      date: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString()
    })
  },
  
  async removeAdvisory(id) {
    await deleteDoc(doc(db, 'advisories', id))
  }
})

advisoryStore.init()