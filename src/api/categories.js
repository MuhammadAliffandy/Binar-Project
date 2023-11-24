const express = require('express');
const { getAllCategoryHandler } = require("../controllers/categoryController");
const router = express.Router();

router
.get('/', getAllCategoryHandler)

module.exports = router;