// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCteVF8_uUEFxAvYmzq0zhRFG4piMwGsiU",
  authDomain: "gestao-rural-78412.firebaseapp.com",
  projectId: "gestao-rural-78412",
  storageBucket: "gestao-rural-78412.firebasestorage.app",
  messagingSenderId: "922730353237",
  appId: "1:922730353237:web:3a531876fef3caabcbfadc",
  measurementId: "G-WRW13WFB77"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };