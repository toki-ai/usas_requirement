import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDMrsRBA2BGS2ehkewXHOispEbULfWKYAI',
  authDomain: 'usas-ec981.firebaseapp.com',
  projectId: 'usas-ec981',
  storageBucket: 'usas-ec981.firebasestorage.app',
  messagingSenderId: '855614176818',
  appId: '1:855614176818:web:41e8ed68b724d0f050862b',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const firebaseProjectId = firebaseConfig.projectId
