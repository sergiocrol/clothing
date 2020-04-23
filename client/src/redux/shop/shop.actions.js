import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  // Here, this action creator is returning a function with a dispatch (redux-thunk, applied as middleware in store.js allows us to do this)
  // so we have the hability to dispatch multiple actions instead only one.
  // redux-thunk is a middleware between action creator an the reducer, that will catch ONLY those actions that are functions
  // and not objects (in this case redux-thunk is not taking care about fetchCollectionStart... because return objects). And 
  // the only thing that redux-thunk is doing is to give the dispatch functionality as a parameter, so we can use a call actions
  // whenever we want
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    // in this moment we dispatch the fetchCollectionStart action, so isFetching state change to true
    dispatch(fetchCollectionsStart());
    collectionRef.get().then(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionSuccess(collectionsMap));
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
  }

  /* Firestore provides us a API where we can write out project id (clothing-shop-db-b4034) to get our data
fetch('https://firestore.googleapis.com/v1/projects/clothing-shop-db-b4034/databases/(default)/documents/collections')
  .then(response => response.json())
  .then(collections => console.log(collections));*/
}