const express = require("express");
const router = express.Router();

const { authorize } = require("../middleware/auth");
const { get_all_users } = require("../controllers/getAllUsers");

router.get("/get_all_users", authorize, async (req, res) => {
  try {
    const users = await get_all_users();

    if (users.length < 0) {
      res.status(404).json({ error: "users not found" });
    }

    const userNames = users.map((user) => user.userName);
    console.log(userNames);

    res.status(200).json(userNames);
  } catch (err) {
    res.status(500).send("Internal server error", err, err.message);
    console.log("internal server error", err, err.message);
  }
});

module.exports = router;
