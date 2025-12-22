// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBvCGL9KGDUSx-GJvtCvp2JC-VALVnSrd4',
  authDomain: 'quanly-giai.firebaseapp.com',
  projectId: 'quanly-giai',
  storageBucket: 'quanly-giai.firebasestorage.app',
  messagingSenderId: '282082639668',
  appId: '1:282082639668:web:767dc703ba0b296f10af61',
  measurementId: 'G-TD5NFV061E'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
