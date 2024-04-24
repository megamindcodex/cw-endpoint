const express = require("express");
const router = express.Router();

const { authorize } = require("../middleware/auth");
const { get_convo } = require("../controllers/getConvo");

router.get("/get_conversations", authorize, async (req, res) => {
  try {
    const userId = req.userId;
    const conversations = await get_convo(userId);

    if (conversations) {
      res.status(200).json(conversations);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error:", err, err.message);
    console.log("Error getting conversations from database", err, err.message);
  }
});

module.exports = router;
