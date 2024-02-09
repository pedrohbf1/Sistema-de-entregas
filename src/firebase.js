import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDX8G73kYij-wPAQUdp8-HKEfkUYnh1370",
    authDomain: "paulo-lanches-b4704.firebaseapp.com",
    projectId: "paulo-lanches-b4704",
    storageBucket: "paulo-lanches-b4704.appspot.com",
    // messagingSenderId: "423871068446",
    // appId: "1:423871068446:web:de4eb65d4e4e10b4a8f10f",
    // measurementId: "G-PHBLJT7Q1G"
};

const appInitialize = initializeApp(firebaseConfig)

export default appInitialize