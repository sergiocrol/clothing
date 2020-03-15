import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA3CaQKPJS69lFfJi3SJAdE2BtJ65IABYo",
  authDomain: "clothing-shop-db-b4034.firebaseapp.com",
  databaseURL: "https://clothing-shop-db-b4034.firebaseio.com",
  projectId: "clothing-shop-db-b4034",
  storageBucket: "clothing-shop-db-b4034.appspot.com",
  messagingSenderId: "915496292760",
  appId: "1:915496292760:web:79faf81cfe929e13ef9bed"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;