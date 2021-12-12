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
    return 1;
  } catch (err) {
    alert(err.message);
    return -1;
  }
};

export const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => doc.data());
    const userExist = users.some((element) => element.username === username);
    if (userExist) {
      alert("Username is already used, try different username");
      return -1;
    }
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    db.collection("users").doc(username).set({
      uid: user.uid,
      username,
      email,
      wins : 0,
      loses : 0,
      ties : 0
    });
    alert("Successfuly registered!");
    return 1;
  } catch (err) {
    alert(err.message);
    return -1;
  }
}

export const addLoseToUser = async (username) => {
  const loses = await db.collection("users").doc(username).get().then((snapshot) => {return snapshot.data().loses});
  await db.collection("users").doc(username).update({"loses" : loses+1});
}

export const addWinToUser = async (username) => {
  console.log(username);
  const wins = await db.collection("users").doc(username).get().then((snapshot) => {return snapshot.data().wins});
  console.log(wins);
  await db.collection("users").doc(username).update({"wins" : wins+1});
}

export const addTieToUser = async (username) => {
  const ties = await db.collection("users").doc(username).get().then((snapshot) => {return snapshot.data().ties});
  await db.collection("users").doc(username).update({"ties" : ties+1});
}

export const getUsernameByEmail = async (email) => {
  const snapshot = await db.collection("users").where("email", "==", email).get();
  var users = [];
  snapshot.forEach(doc => {
    users.push(doc.id);
  });
  return users[0];
}

export const getArrayOfUsers = async () => {
  const snapshot = await db.collection("users").get();
  var users = [];
  snapshot.forEach(doc => {
    users.push(doc.data());
  });
  return users;
}
