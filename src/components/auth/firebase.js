import { useGridLogger } from "@mui/x-data-grid";
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
    const user = await auth.signInWithEmailAndPassword(email, password);
    const uid = user.user.uid;
    const username = await getUsernameByEmail(email);
    await db
    .collection("users")
    .doc(username)
    .update({ uid : uid });
    return uid;
  } catch (err) {
    alert(err.message);
    return null;
  }
};

export const getUsernameByUid = async (uid) => {
  const snapshot = await db
    .collection("users")
    .where("uid", "==", uid)
    .get();
  var users = [];
  snapshot.forEach((doc) => {
    users.push(doc.id);
  });
  return users[0];
}

export const registerWithEmailAndPassword = async (
  username,
  email,
  password
) => {
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
      wins: 0,
      loses: 0,
      ties: 0,
    });
    alert("Successfuly registered!");
    return 1;
  } catch (err) {
    alert(err.message);
    return -1;
  }
};

export const addLoseToUser = async (uid) => {
  const username = await getUsernameByUid(uid);
  const loses = await db
    .collection("users")
    .doc(username)
    .get()
    .then((snapshot) => {
      return snapshot.data().loses;
    });
  await db
    .collection("users")
    .doc(username)
    .update({ loses: loses + 1 });
};

export const addWinToUser = async (uid) => {
  const username = await getUsernameByUid(uid);
  const wins = await db
    .collection("users")
    .doc(username)
    .get()
    .then((snapshot) => {
      return snapshot.data().wins;
    });
  console.log(wins);
  await db
    .collection("users")
    .doc(username)
    .update({ wins: wins + 1 });
};

export const addTieToUser = async (uid) => {
  const username = await getUsernameByUid(uid);
  const ties = await db
    .collection("users")
    .doc(username)
    .get()
    .then((snapshot) => {
      return snapshot.data().ties;
    });
  await db
    .collection("users")
    .doc(username)
    .update({ ties: ties + 1 });
};

export const getUsernameByEmail = async (email) => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  var users = [];
  snapshot.forEach((doc) => {
    users.push(doc.id);
  });
  return users[0];
};

export const getArrayOfUsers = async () => {
  const snapshot = await db.collection("users").get();
  var users = [];
  snapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};

export const sendPasswordResetEmail = async (email) => {
  try {
    console.log(email);
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
    return 1;
  } catch (err) {
    alert(err.message);
    return -1;
  }
};

const getEmailByUsername = async (username) => {
  const email = await db
    .collection("users")
    .doc(username)
    .get()
    .then((snapshot) => {
      return snapshot.data().email;
    });
  return email;
};

export const changeEmailOrPassword = async (
  uid,
  password,
  newData,
  operation
) => {
  try {
    const username = await getUsernameByUid(uid);
    const email = await getEmailByUsername(username);
    console.log(email);
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        if (operation === "email") {
          await userCredential.user.updateEmail(newData).catch(error => alert(error));
          //await db.collection("users").doc(username).update({ email: newData });
        } else if (operation === "password")
          userCredential.user.updatePassword(newData);
      });
    return 1;
  } catch (err) {
    alert(err.message);
    return -1;
  }
};

export const changeUsernameByUid = async (uid, password, newUsername) => {
  try {
    const oldUsername = await getUsernameByUid(uid);
    const email = await getEmailByUsername(oldUsername);
    await auth.signInWithEmailAndPassword(email, password);
    var data;
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    snapshot.forEach((element) => {
      data = element;
      data.username = newUsername;
    });
    await db.collection("users").doc(newUsername).set(data);
    await db.collection("users").doc(oldUsername).delete();
    return 1;
  } catch (error) {
    alert(error.message);
    return -1;
  }
};

export const resetScore = async (uid, password) => {
  try {
    const username = await getUsernameByUid(uid);
    const email = await getEmailByUsername(username);
    await auth.signInWithEmailAndPassword(email, password);
    await db
      .collection("users")
      .doc(username)
      .update({ ties: 0, wins: 0, loses: 0 });
    return 1;
  } catch (error) {
    console.log(error.message);
    return -1;
  }
};
