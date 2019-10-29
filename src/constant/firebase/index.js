import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions

const config = {
  apiKey: "AIzaSyDyaC7RrBFuzIhLC_tdfRt8mQb-hxPtJR8",
  authDomain: "inspectionform-364ca.firebaseapp.com",
  databaseURL: "https://inspectionform-364ca.firebaseio.com",
  projectId: "inspectionform-364ca",
  storageBucket: "inspectionform-364ca.appspot.com",
  messagingSenderId: "566949544267"
};
firebase.initializeApp(config);

const FIREBASE = firebase;
const FIRESTORE = firebase.firestore();
const STORAGE = firebase.storage();
const AUTH = firebase.auth();

export { FIRESTORE, FIREBASE, STORAGE, AUTH };