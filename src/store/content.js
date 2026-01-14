import { reactive } from 'vue'
import { db } from '@/config/firebase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const contentStore = reactive({
  home: {
    title: 'Welcome to Purok Lapad Bato',
    content: 'A vibrant community in the heart of our barangay.'
  },
  about: {
    title: 'About Us',
    content: 'Purok Lapad Bato is a close-knit community dedicated to serving our residents.'
  },
  
  async init() {
    await this.loadHome()
    await this.loadAbout()
  },
  
  async loadHome() {
    const docRef = doc(db, 'content', 'home')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      this.home = docSnap.data()
    } else {
      await this.saveHome()
    }
  },
  
  async loadAbout() {
    const docRef = doc(db, 'content', 'about')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      this.about = docSnap.data()
    } else {
      await this.saveAbout()
    }
  },
  
  async saveHome() {
    await setDoc(doc(db, 'content', 'home'), this.home)
  },
  
  async saveAbout() {
    await setDoc(doc(db, 'content', 'about'), this.about)
  }
})

contentStore.init()