const express = require("express");
const router = express.Router();

const { authorize } = require("../middleware/auth");
const { getUserData } = require("../controllers/getUserData");

router.get("/fetchUserData", authorize, async (req, res) => {
  try {
    const user = await getUserData(req.userId);
    // console.log(req.userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return null;
    }

    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("internal server error:", err.message, err);
    console.log("internal server error:", err.message, err);
  }
});

module.exports = router;
