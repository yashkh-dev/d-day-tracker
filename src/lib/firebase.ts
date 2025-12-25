import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAnn0Hrc9K7v-nzCpk-xKdSy44yNca5qCk",
    authDomain: "mext-54384.firebaseapp.com",
    projectId: "mext-54384",
    storageBucket: "mext-54384.firebasestorage.app",
    messagingSenderId: "765996852970",
    appId: "1:765996852970:web:f694a46ac777371490d993",
    measurementId: "G-3WX9PN9GZB"
};

// Initialize Firebase
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
// Use existing app if already initialized (prevents errors in strict mode)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
