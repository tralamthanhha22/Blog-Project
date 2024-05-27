import {initializeApp} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA-TQazGHDwgCcfj8M03JS_APz7rCBkX4U",
    authDomain: "blog-system-f3c64.firebaseapp.com",
    databaseURL: "https://blog-system-f3c64-default-rtdb.firebaseio.com",
    projectId: "blog-system-f3c64",
    storageBucket: "blog-system-f3c64.appspot.com",
    messagingSenderId: "1010501051100",
    appId: "1:1010501051100:web:d5b686c9632189d1b54a19",
    measurementId: "G-2Z1ZGGJ4CJ"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const loginBtn = document.getElementById("login-with-google-btn"); // Replace with your actual ID
const provider=new GoogleAuthProvider();

//login button
loginBtn.addEventListener("click", function() {
    // alert("Login button clicked!")
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        alert(user.displayName+' '+user.email)
        document.getElementById("displayName").value=user.displayName
        document.getElementById("email").value=user.email
        document.getElementById('myForm').submit();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        console.log(errorMessage)
    });
});
