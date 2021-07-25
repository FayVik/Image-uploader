import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyB-vwbOUWeJxqfYBsBoxIpIljlxj5SQEUU',
	authDomain: 'uploader-89d2b.firebaseapp.com',
	projectId: 'uploader-89d2b',
	storageBucket: 'uploader-89d2b.appspot.com',
	messagingSenderId: '743786265718',
	appId: '1:743786265718:web:a9f465eff174b5941f3357',
	measurementId: 'G-9CSF20TBR6',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
