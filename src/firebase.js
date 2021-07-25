import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_KEY_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_KEY_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_KEY_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_KEY_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_KEY_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_KEY_MEASURMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
