const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/auth");
const {
  change_hasRead_to_true,
  change_hasRead_to_false,
} = require("../controllers/changeHasRead");

router.put("/toggle_hasRead", authorize, async (req, res) => {
  try {
    const { receiverName, condition } = req.body;
    const userId = req.userId;
    // console.log(receiverName, userId, condition);

    if (condition === true) {
      console.log(condition);
      console.log(`Setting ${receiverName} hasRead to ${condition}`);
      const hasRead = await change_hasRead_to_true(
        userId,
        receiverName,
        condition
      );
      res.status(200).json({ hasRead: hasRead });
    }

    if (condition === false) {
      console.log(condition);
      console.log(`Setting ${receiverName} hasRead to ${condition}`);
      const hasRead = await change_hasRead_to_false(
        userId,
        receiverName,
        condition
      );
      res.status(200).json({ hasRead: hasRead });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
    console.error("Internal Server Error", err, err.message);
  }
});

module.exports = router;
