const express = require('express');
const { placeOrder, getUserOrders, getOrder } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrder);

module.exports = router;
