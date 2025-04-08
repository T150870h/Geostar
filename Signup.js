// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGr1-2vKzA7zK-_z9XIP9XDaziBiHk6TY",
    authDomain: "jsi-spck-7f771.firebaseapp.com",
    projectId: "jsi-spck-7f771",
    storageBucket: "jsi-spck-7f771.appspot.com",
    messagingSenderId: "469840423846",
    appId: "1:469840423846:web:fb8a1983e3f40991a67d67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Function to display messages
function showMessage(text, type) {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = "";

    const message = document.createElement("h4");
    message.textContent = text;
    message.style.color = type === "error" ? "red" : "green";
    messageContainer.appendChild(message);
}

// Handle signup
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confPassword = document.getElementById('confPassword').value.trim();
    const username = document.getElementById('username').value.trim();


    if (!email) {
        showMessage("⚠️ Enter your email!", "error");
        return;
    }
    if (!password) {
        showMessage("⚠️ Enter your password!", "error");
        return;
    }
    if (password.length < 6) {
        showMessage("⚠️ Password must be at least 6 characters!", "error");
        return;
    }
    if (password !== confPassword) {
        showMessage("⚠️ Passwords do not match!", "error");
        return;
    }
    if (username.length>20) {
        showMessage("⚠️ Username must be less than 20 characters!","error");
        return;
    }

    // Create user
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Save to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: email,
                username: username
            });

            showMessage("✅ Account created successfully! Redirecting...", "success");
            setTimeout(() => window.location.href = "Login.html", 2000);
        })
        .catch((error) => {
            let errorMessage = "⚠️ An unknown error occurred!";
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "⚠️ Email is already in use!";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "⚠️ Invalid email format!";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "⚠️ Password is too weak!";
            }
            showMessage(errorMessage, "error");
            console.error("Firebase Error:", error);
        });
});
