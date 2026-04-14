import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey:  "AIzaSyBmnC2mqOt2KguVm9Cy8dUzfL3fAhmlIbE",
    authDomain: "school-portal-7e016.firebaseapp.com",
    projectId: "school-portal-7e016",
    appId: "1:588178709968:web:79badaacdaa022ba076dd5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// PROTECT INVENTORY PAGE
function protectInventoryPage() {
  onAuthStateChanged(auth, async (user) => {

    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (!docSnap.exists()) {
      window.location.href = "login.html";
      return;
    }

    const role = docSnap.data().role;

    if (role !== "admin") {
      window.location.href = "student.html";
    }
  });
}

// EXPORT FUNCTION
export { protectInventoryPage };

window.signup = function() {
  createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  ).then(() => {
    msg.innerText = "Account created!";
  }).catch(e => msg.innerText = e.message);
}

window.login = function() {
  signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  ).then(() => {
    msg.innerText = "Login successful!";
    window.location.href = "dashboard.html";
  }).catch(e => msg.innerText = e.message);
}

const form = document.getElementById("inventoryForm");
if (form) {
    const tableBody = document.querySelector("#inventoryTable tbody");
    let nextId = 1001;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const itemName = document.getElementById("itemName").value;
      const category = document.getElementById("category").value;
      const quantity = document.getElementById("quantity").value;
      const location = document.getElementById("location").value;
      const condition = document.getElementById("condition").value;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>INV-${nextId++}</td>
        <td>${itemName}</td>
        <td>${category}</td>
        <td>${quantity}</td>
        <td>${location}</td>
        <td>${condition}</td>
      `;

      tableBody.appendChild(row);
      form.reset();
    });
}