import * as firebase from "firebase";
import app from 'firebase/app';

import { FirebaseConfig } from "./firebaseConfig";

class Firebase {
  constructor() {
    app.initializeApp(FirebaseConfig);
    this.products = app.database().ref('products');
    this.provider = new firebase.auth.GoogleAuthProvider()

    this.auth = app.auth();
  }

  getCurrentUser = () => this.auth.getCurrentUser();
  googleLogin = () => this.auth.signInWithPopup(this.provider);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  onAuthStateChanged = () => this.auth.onAuthStateChanged();

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
