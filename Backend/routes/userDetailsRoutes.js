const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { createOrUpdateUserDetails, getUserDetails } = require('../controllers/userDetailsController');

router.get('/', authMiddleware, getUserDetails);
router.post('/', authMiddleware, upload.single('resume'), createOrUpdateUserDetails);

module.exports = router;
