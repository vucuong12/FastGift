
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDgTgfZaVe91_ocsgELO4CrH9o7E23x9C0",
  authDomain: "fastgift-679c3.firebaseapp.com",
  databaseURL: "https://fastgift-679c3.firebaseio.com",
  projectId: "fastgift-679c3",
  storageBucket: "fastgift-679c3.appspot.com",
  messagingSenderId: "585211928797"
};
firebase.initializeApp(config);

/*TESTING*/

var database = firebase.database();

var giftsDatabase = database.ref("gifts");




