import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions

const config = {
  apiKey: "AIzaSyCX52d_eJ42PEl0jXdfj_GqHa3fi8URvOc",
  authDomain: "websadiqulislam.firebaseapp.com",
  databaseURL: "https://websadiqulislam.firebaseio.com",
  projectId: "websadiqulislam",
  storageBucket: "websadiqulislam.appspot.com",
  messagingSenderId: "576546393592"
};
firebase.initializeApp(config);

const FIRESTORE = firebase.firestore();
const FIREBASE = firebase;

export { FIRESTORE, FIREBASE };