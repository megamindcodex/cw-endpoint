const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/auth");
const { change_hasRead_to_true } = require("../controllers/changeHasRead");

router.put("/change_hasRead_to_true", authorize, async (req, res) => {
  try {
    const { receiverName } = req.body;
    const userId = req.userId;
    console.log(receiverName, userId);

    const hasRead = await change_hasRead_to_true(userId, receiverName);

    if (hasRead) {
      res.status(200).json({ hasRead: true });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
    console.error("Internal Server Error", err, err.message);
  }
});

module.exports = router;
