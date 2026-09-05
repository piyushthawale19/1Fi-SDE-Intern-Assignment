const prisma = require('../config/db');
const { calculateEMI } = require('../services/emiCalculator');

const placeOrder = async (req, res) => {
  try {
    const { productId, variantId, emiPlanId } = req.body;
    const userId = req.user.userId;

    if (!productId || !emiPlanId) {
      return res.status(400).json({ success: false, message: 'productId and emiPlanId are required' });
    }

    const product = await prisma.marketplaceProduct.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const emiPlan = await prisma.eMIPlan.findUnique({ where: { id: emiPlanId } });
    if (!emiPlan) {
      return res.status(404).json({ success: false, message: 'EMI plan not found' });
    }

    const monthlyEMI = calculateEMI(product.discountedPrice, emiPlan.interestRate, emiPlan.tenureMonths);
    const totalAmount = parseFloat((monthlyEMI * emiPlan.tenureMonths + emiPlan.processingFee).toFixed(2));

    const order = await prisma.order.create({
      data: {
        userId,
        productId,
        variantId: variantId || null,
        emiPlanId,
        monthlyEMI,
        totalAmount,
        status: 'CONFIRMED',
      },
      include: {
        product: { select: { id: true, name: true, brand: true, images: true, discountedPrice: true } },
        variant: { select: { id: true, label: true } },
        emiPlan: { select: { tenureMonths: true, interestRate: true } },
      },
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('placeOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        product: { select: { id: true, name: true, brand: true, images: true, discountedPrice: true } },
        variant: { select: { id: true, label: true } },
        emiPlan: { select: { tenureMonths: true, interestRate: true, processingFee: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const enriched = orders.map((o) => ({
      ...o,
      product: o.product ? {
        ...o.product,
        images: safeParseJSON(o.product.images, []),
      } : null,
    }));

    res.json({ success: true, data: enriched });
  } catch (error) {
    console.error('getUserOrders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user orders' });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        product: { select: { id: true, name: true, brand: true, images: true, discountedPrice: true } },
        variant: { select: { id: true, label: true } },
        emiPlan: { select: { tenureMonths: true, interestRate: true, processingFee: true } },
      },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.userId !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const enriched = {
      ...order,
      product: order.product ? {
        ...order.product,
        images: safeParseJSON(order.product.images, []),
      } : null,
    };

    res.json({ success: true, data: enriched });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
};

function safeParseJSON(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

module.exports = { placeOrder, getUserOrders, getOrder };
