const express = require("express");
const router = express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");

router.get("/login", accountController.buildLogin);
router.get("/registration", utilities.handleErrors(accountController.buildRegistration));
router.post('/register', utilities.handleErrors(accountController.registerAccount));




router.use((err, req, res, next) => {
    console.error(err.stack);
  res.status(500).send("Something went worng!");
});

module.exports = router;
