import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNgGzmzuTXGuWKNSYHlwdf3Smj-unr-cY",
  authDomain: "system-for-gym.firebaseapp.com",
  projectId: "system-for-gym",
  storageBucket: "system-for-gym.appspot.com",
  messagingSenderId: "243494675657",
  appId: "1:243494675657:web:2578fc5727faa84e499918",
  measurementId: "G-NVF79TLDEK"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
