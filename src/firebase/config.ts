import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCVfRifivvI7oCbBDN_IIR89LwjgV9QEVQ",
  authDomain: "sstc-connect.firebaseapp.com",
  projectId: "sstc-connect",
  storageBucket: "sstc-connect.firebasestorage.app",
  messagingSenderId: "752579393736",
  appId: "G-NH25M9YXFP"
,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app