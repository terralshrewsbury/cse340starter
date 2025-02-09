// routes/intentionalError.js
const express = require('express');
const router = express.Router();

// This route will intentionally cause a 500 error
router.get('/trigger-error', (req, res, next) => {
    const err = new Error('This is an intentional error.');
    err.status = 500; // set the status to 500 for internal server error
    next(err); // pass the error to the error-handling middleware
});

module.exports = router;