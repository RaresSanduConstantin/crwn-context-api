import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBcqFaxIFV7PnDsGH2PZeiDBsYLCLmg_Bk",
  authDomain: "crwn-db-9c389.firebaseapp.com",
  projectId: "crwn-db-9c389",
  storageBucket: "crwn-db-9c389.appspot.com",
  messagingSenderId: "442497438071",
  appId: "1:442497438071:web:9dfef8fbdeb2959baad172",
  measurementId: "G-ZCNP453P8E",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
