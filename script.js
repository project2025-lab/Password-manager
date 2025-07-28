// Confirm JS is running
console.log("✅ JS is connected");

// Get references to DOM elements
const form = document.getElementById("password-form");
const passwordList = document.getElementById("password-list");

// Load saved passwords from localStorage
function loadPasswords() {
  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
  passwordList.innerHTML = "";

  passwords.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.site}</strong><br>
      Username: ${item.username} <br>
      Password: ${item.password} 
      <button onclick="deletePassword(${index})">Delete</button>
    `;
    passwordList.appendChild(li);
  });
}

// Save a new password entry
function savePassword(site, username, password) {
  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
  passwords.push({ site, username, password });
  localStorage.setItem("passwords", JSON.stringify(passwords));
  loadPasswords();
}

// Delete a password entry
function deletePassword(index) {
  const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
  passwords.splice(index, 1);
  localStorage.setItem("passwords", JSON.stringify(passwords));
  loadPasswords();
}

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const site = document.getElementById("site").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  savePassword(site, username, password);
  form.reset();
});

// ✅ Generate random password and fill the input
function generatePassword() {
  console.log("🔐 generatePassword() called");

  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Set value in the password input field
  document.getElementById("password").value = password;
}

// Load existing passwords on page load
loadPasswords();