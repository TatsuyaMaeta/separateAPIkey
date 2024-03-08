// firebaseApikey.jsからexportされているオブジェクトを
// main.jsでfirebaseConfigという変数名で取り扱うよ、という記述になります
import firebaseConfig from "./firebaseApikey.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

console.log(firebaseConfig);

// Initialize Firebase
// ログインだけのサンプルページなのでinitializeのみ
const app = initializeApp(firebaseConfig);
// console.log(app);

// ##################################
// GoogleAuth(認証用)
// ##################################
// 認証用のスクリプト↓
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const auth = getAuth();
// ##################################
// ログイン処理
// ##################################
$("#login").on("click", function () {
    //Google認証完了の処理
    signInWithPopup(auth, provider)
        .then((auth, result) => {
            // Login後のページ遷移
            console.log("ログインOK");
            location.href = "loginedPage.html"; //遷移先次のページ
        })
        .catch((error) => {
            console.log("ログイン失敗");
            console.log(error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
});
