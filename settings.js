// Load username
document.addEventListener("DOMContentLoaded", () => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) document.getElementById("username").value = savedUsername;

    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.className = savedTheme;
    document.getElementById("theme").value = savedTheme;
});

// Change Username
document.getElementById('username-btn').addEventListener('click', () => {
    const newUsername = document.getElementById("username").value.trim();
    if (!newUsername) return alert("Username cannot be empty!");
    localStorage.setItem("username", newUsername);
    alert("Username updated!");
});

// Change Password (demo)
document.getElementById('password-btn').addEventListener('click', () => {
    const newPassword = document.getElementById("password").value.trim();
    if (!newPassword) return alert("Password cannot be empty!");
    alert("Password changed (demo only)!");
});

// Apply Theme
document.getElementById("theme-btn").addEventListener("click", () => {
    const theme = document.getElementById("theme").value;
    document.body.className = theme;
    localStorage.setItem("theme", theme);
    alert("Theme applied!");
});
