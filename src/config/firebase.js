import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC_CX626zZqLR_QVMMm6eDrzD-DjRKYRJo",
  authDomain: "purok-lapad-bato.firebaseapp.com",
  projectId: "purok-lapad-bato",
  storageBucket: "purok-lapad-bato.firebasestorage.app",
  messagingSenderId: "281577340146",
  appId: "1:281577340146:web:295aee8fe429d380eea46b",
  measurementId: "G-M9VZCDC6WJ"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)