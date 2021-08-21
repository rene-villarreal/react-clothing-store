import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDk9wv0kpwKHTYposetKDZJ054eRH6buEs",
    authDomain: "clothing-db-32778.firebaseapp.com",
    projectId: "clothing-db-32778",
    storageBucket: "clothing-db-32778.appspot.com",
    messagingSenderId: "928157691520",
    appId: "1:928157691520:web:36283b04bb96a588fa8065",
    measurementId: "G-S4KF7X599H"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

      if(!snapShot.exists) {
         const { displayName, email } = userAuth;
         const createdAt = new Date();

          try {
             await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData
             })
          }  catch (error) {
              console.log('error creating user', error.message);

          }
       }
      return userRef;
   };

  firebase.initializeApp(config);

  //used to easily add collections with shop data to firebase
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
      const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data()
          
        return {
          routeName: encodeURI(title.toLowerCase()),
          id: doc.id, 
          title,
          items
        };
      });

      return transformedCollection.reduce((accumulator, collection) => {
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;
      }, {});
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase;