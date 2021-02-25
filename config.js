import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBcpyTkxpQfX-aYxW5Wy6fFSN3csuL1JqQ",
    authDomain: "project-54c4e.firebaseapp.com",
    projectId: "project-54c4e",
    storageBucket: "project-54c4e.appspot.com",
    messagingSenderId: "870326932174",
    appId: "1:870326932174:web:7f8ee9b897fc68afaeb69f"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();