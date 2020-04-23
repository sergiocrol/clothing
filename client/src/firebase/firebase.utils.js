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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // To perform CRUD methods (set(), get(), update(), delete()) we use documentRef
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // The snapshot represents the data
  const snapShot = await userRef.get();

  // If the snapshot does not exist, we create it
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;