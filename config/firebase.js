import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBQ_hO38Au1jFnYfLeY_18HVQ8Y87X6qzc",
  authDomain: "fir-react-c452d.firebaseapp.com",
  projectId: "fir-react-c452d",
  storageBucket: "fir-react-c452d.firebasestorage.app",
  messagingSenderId: "195494693330",
  appId: "1:195494693330:web:f39f5824ac9ad8b6d7200b",
  measurementId: "G-VTQ7X8BJ48"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Use correct auth initialization based on platform
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app); // Use standard web auth
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };

export const db = getFirestore(app);
export const storage = getStorage(app);
export const usersRef = collection(db, 'users');
