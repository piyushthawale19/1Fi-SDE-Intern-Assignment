const prisma = require('../config/db');
const { calculateEMI, calculateTotalPayable } = require('../services/emiCalculator');

const listProducts = async (req, res) => {
  try {
    const { search, category, brand } = req.query;

    const where = { inStock: true };

    if (category && category !== 'all') {
      where.category = category;
    }

    if (brand && brand !== 'all') {
      where.brand = { contains: brand };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const products = await prisma.marketplaceProduct.findMany({
      where,
      include: {
        variants: { where: { available: true } },
        emiPlans: { orderBy: { tenureMonths: 'asc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Enrich with computed EMI and parsed JSON fields
    const enriched = products.map((p) => enrichProduct(p));

    res.json({ success: true, data: enriched });
  } catch (error) {
    console.error('listProducts error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await prisma.marketplaceProduct.findUnique({
      where: { id: req.params.id },
      include: {
        variants: { where: { available: true } },
        emiPlans: { orderBy: { tenureMonths: 'asc' } },
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: enrichProduct(product) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.marketplaceProduct.findMany({
      select: { category: true },
      distinct: ['category'],
      where: { inStock: true },
    });
    res.json({ success: true, data: categories.map((c) => c.category) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

// Parse JSON strings stored in SQLite and compute EMI amounts
function enrichProduct(product) {
  const images = safeParseJSON(product.images, []);
  const specifications = safeParseJSON(product.specifications, {});

  const emiPlans = product.emiPlans.map((plan) => {
    const monthlyAmount = calculateEMI(
      product.discountedPrice,
      plan.interestRate,
      plan.tenureMonths
    );
    const totalPayable = calculateTotalPayable(monthlyAmount, plan.tenureMonths, plan.processingFee);

    return { ...plan, monthlyAmount, totalPayable };
  });

  return { ...product, images, specifications, emiPlans };
}

function safeParseJSON(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

module.exports = { listProducts, getProduct, getCategories };
