// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGr1-2vKzA7zK-_z9XIP9XDaziBiHk6TY",
  authDomain: "jsi-spck-7f771.firebaseapp.com",
  projectId: "jsi-spck-7f771",
  storageBucket: "jsi-spck-7f771.firebasestorage.app",
  messagingSenderId: "469840423846",
  appId: "1:469840423846:web:fb8a1983e3f40991a67d67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(text, type) {
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = ""; // Clear previous messages

    const message = document.createElement("h4");
    message.textContent = text;
    message.style.color = type === "error" ? "red" : "green";
    messageContainer.appendChild(message);
}

// Handle login
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent browser validation popups

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email) {
        showMessage("⚠️ Enter your email!", "error");
        return;
    }
    if (!password) {
        showMessage("⚠️ Enter your password!", "error");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const username = userDoc.exists() ? userDoc.data().username : "Unknown";

        localStorage.setItem("username", username);

        showMessage("✅ Login Successful! Redirecting...", "success");
        setTimeout(() => window.location.href = "JSI.html", 2000);
    } catch (error) {
        let errorMessage = "⚠️ Incorrect email or password!";
        if (error.code === "auth/user-not-found") {
            errorMessage = "⚠️ No account found with this email!";
        } else if (error.code === "auth/wrong-password") {
            errorMessage = "⚠️ Incorrect password!";
        } else if (error.code === "auth/invalid-email") {
            errorMessage = "⚠️ Invalid email format!";
        }
        showMessage(errorMessage, "error");
        console.error("Firebase Error:", error);
    }
});
