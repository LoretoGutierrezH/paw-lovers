import * as firebase from 'firebase';
// Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyA8PUJL2pZj7Vy0602V22CkvLmgyRwCnYY",
  authDomain: "paw-lovers-2.firebaseapp.com",
  databaseURL: "https://paw-lovers-2.firebaseio.com",
  projectId: "paw-lovers-2",
  storageBucket: "paw-lovers-2.appspot.com",
  messagingSenderId: "443458945688",
  appId: "1:443458945688:web:f229528639de085d3446ed",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;