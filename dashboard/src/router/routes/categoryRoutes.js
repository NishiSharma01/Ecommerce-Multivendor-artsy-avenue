const express = require('express');
const router = express.Router();
const { addCategory } = require('../controllers/categoryController');

router.post('/category-add', addCategory);

module.exports = router;
