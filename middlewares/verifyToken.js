const User = require("../models/userModel");
const admin = require("../config/firebaseConfig");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    console.log(token);
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    // Fetch the corresponding user from MongoDB to check their role
    const userInDb = await User.findOne({ firebaseUid: decodedToken.uid });
    console.log(userInDb);

    if (userInDb) {
      // return res.status(404).json({ message: "User not found in database" });
      decodedToken.role = userInDb.role;
    } else {
      decodedToken.role = "user";
    }

    // Attach the user's role from MongoDB to req.user

    req.user = decodedToken; // Attach decoded Firebase token to req.user

    console.log(req.user);
    next();
  } catch (error) {
    console.log("Error CC");
    return res.status(403).json({ message: "Unauthorized", error });
  }
};

module.exports = verifyToken
