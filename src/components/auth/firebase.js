import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB6pMIrvFal9tedbnYPFNkPoyvYZoPWGv0",
  authDomain: "tic-tac-toe-bfea3.firebaseapp.com",
  databaseURL:
    "https://tic-tac-toe-bfea3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tic-tac-toe-bfea3",
  storageBucket: "tic-tac-toe-bfea3.appspot.com",
  messagingSenderId: "442206404095",
  appId: "1:442206404095:web:cbe20221b1021a16393bca",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err.message);
    return -1;
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    alert("Successfuly registered!");
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return res.json();
  } catch (err) {
    alert(err.message);
    return {};
  }
};
