const express = require("express");
const router = express.Router();

const { authorize } = require("../middleware/auth");
const { get_chats } = require("../controllers/getCahts");

router.get("/get_chats", authorize, async (req, res) => {
  try {
    // const users = ["codex001", "emmanvictor"];
    const users = req.query.users;
    console.log(users);

    const chats = await get_chats(users);
    // console.log(chats);

    if (chats) {
      res.status(200).json(chats);
    }
  } catch (err) {
    res.status(500).send("Internal server error:", err, err.message);
    console.log("Error getting chats from database", err, err.message);
  }
});

module.exports = router;
