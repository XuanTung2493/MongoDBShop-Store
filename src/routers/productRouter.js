const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/seed-manufacturers', productController.seedManufacturers);

module.exports = router;