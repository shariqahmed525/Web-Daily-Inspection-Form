import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions

const config = {
};
firebase.initializeApp(config);

const FIREBASE = firebase;
const FIRESTORE = firebase.firestore();
const STORAGE = firebase.storage();
const AUTH = firebase.auth();

export { FIRESTORE, FIREBASE, STORAGE, AUTH };
