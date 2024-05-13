const express = require("express");
const router = express.Router();

const { authorize } = require("../middleware/auth");
const { save_message_to_db } = require("../controllers/saveMsg");

router.post("/saveMessage", authorize, async (req, res) => {
  try {
    const { receiver, message, timeStamp } = req.body;
    // console.log(receiver, message);
    const userId = req.userId;
    const result = await save_message_to_db(
      receiver,
      message,
      timeStamp,
      userId
    );

    if (result) {
      res.status(200).json({ message: "save message success" });
    }
  } catch (err) {
    res.status(500).send("interal server error:", err, err.message);
    console.log("Error saving message to db:", err, err.message);
  }
});

module.exports = router;
