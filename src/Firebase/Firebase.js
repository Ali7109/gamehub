import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FB_KEY,
	authDomain: "gamehub-dbb2b.firebaseapp.com",
	projectId: "gamehub-dbb2b",
	storageBucket: "gamehub-dbb2b.appspot.com",
	messagingSenderId: "26190038291",
	appId: "1:26190038291:web:9316c6a914159ba5d206e6",
	measurementId: "G-6B7C5KJ51P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db, auth, provider };
