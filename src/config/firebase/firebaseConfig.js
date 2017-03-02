/**
 * Created by Admin on 12/29/2016.
 */
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBN3sKGbzJoF5CgAURgONKz0j1dW1xUCDM",
    authDomain: "panacloudbloodbank.firebaseapp.com",
    databaseURL: "https://panacloudbloodbank.firebaseio.com",
    storageBucket: "panacloudbloodbank.appspot.com",
    messagingSenderId: "715715556450"
};


export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();