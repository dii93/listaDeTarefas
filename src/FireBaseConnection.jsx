import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAW_XfZ-lor1S4yJi7Jf6VVXRxvqpIC2oQ",
    authDomain: "progbanklogin.firebaseapp.com",
    projectId: "progbanklogin",
    storageBucket: "progbanklogin.appspot.com",
    messagingSenderId: "233744140351",
    appId: "1:233744140351:web:d5426c5b2f7d11d18ad08a",
    measurementId: "G-KP6QHBXBNR"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, db };

