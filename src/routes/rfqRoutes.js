const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send("RFQ route is working ✅");
});

module.exports = router;