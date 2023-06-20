const express = require("express");
const router = express.Router();
const { getUserPreferences,
    updateUserPreferences
} = require("../controllers/user");


router.get("/:id", getUserPreferences)
    .patch("/:id", updateUserPreferences)

module.exports = router;