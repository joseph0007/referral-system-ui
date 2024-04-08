import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD0t0p_x2kCQrDcddndYcVxZZwGVdyG8MQ",
  authDomain: "crwn-clothing-e93a4.firebaseapp.com",
  databaseURL: "https://crwn-clothing-e93a4.firebaseio.com",
  projectId: "crwn-clothing-e93a4",
  storageBucket: "crwn-clothing-e93a4.appspot.com",
  messagingSenderId: "847126168089",
  appId: "1:847126168089:web:8e2055bde8d2aea7a86088",
  measurementId: "G-QBRKGPD4LE",
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserDocDB = async (userAuth, additionalData) => {
  // if no user dont create any document!!
  if (!userAuth) return;

  // check if the user already exist
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const userSnap = await userRef.get();

  // if not then create new user
  if (!userSnap.exists) {
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
      console.log("user not created", error);
    }
  }

  return userRef;
};

// fetching shop data
export const fetchShopData = (shopDataRef) => {
  const transformedSopData = shopDataRef.docs.map((el) => {
    const { title, items } = el.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      items,
      title,
      id: el.id,
    };
  });

  // converting/normalizing array to object using reduce (very cool)
  return transformedSopData.reduce((acc, el) => {
    acc[el.title.toLowerCase()] = el;

    return acc;
  }, {});

};

/* --------------------------- return user object --------------------------- */
export const userRef = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      unsubscribe();
      resolve(authUser);
    }, reject);
  });

// google authentication popup
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
