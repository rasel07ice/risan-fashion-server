// server/config/firebaseConfig.js
const admin = require("firebase-admin");
// import serviceAccount from "./serviceAccountKey.json"; // Replace with actual path

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
