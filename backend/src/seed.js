const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  {
    brand: 'Apple',
    name: 'iPhone 15',
    description: 'The iPhone 15 features a 6.1-inch Super Retina XDR display, the powerful A16 Bionic chip, and an advanced dual-camera system. Designed to last with Ceramic Shield, and available with USB-C connectivity.',
    category: 'Smartphones',
    basePrice: 79900,
    discountedPrice: 74900,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
    ]),
    specifications: JSON.stringify({
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A16 Bionic',
      'Camera': '48MP Main + 12MP Ultra Wide',
      'Battery': 'Up to 20 hours video playback',
      'Connectivity': 'USB-C, 5G',
      'Water Resistance': 'IP68',
    }),
    variants: [
      { label: '128GB - Black', type: 'storage', value: '128GB - Black', priceModifier: 0 },
      { label: '256GB - Black', type: 'storage', value: '256GB - Black', priceModifier: 6000 },
      { label: '128GB - Blue', type: 'storage', value: '128GB - Blue', priceModifier: 0 },
      { label: '256GB - Blue', type: 'storage', value: '256GB - Blue', priceModifier: 6000 },
      { label: '128GB - Yellow', type: 'storage', value: '128GB - Yellow', priceModifier: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, processingFee: 0 },
      { tenureMonths: 6, interestRate: 0, processingFee: 0 },
      { tenureMonths: 9, interestRate: 14, processingFee: 199 },
      { tenureMonths: 12, interestRate: 14, processingFee: 199 },
      { tenureMonths: 18, interestRate: 16, processingFee: 299 },
      { tenureMonths: 24, interestRate: 18, processingFee: 299 },
    ],
  },
  {
    brand: 'Samsung',
    name: 'Galaxy S24',
    description: 'Galaxy S24 brings Galaxy AI to your everyday. With a 6.2-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 3 processor, and a pro-grade 50MP camera, it\'s built for what\'s next.',
    category: 'Smartphones',
    basePrice: 74999,
    discountedPrice: 69999,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
    ]),
    specifications: JSON.stringify({
      'Display': '6.2-inch Dynamic AMOLED 2X, 120Hz',
      'Processor': 'Snapdragon 8 Gen 3',
      'Camera': '50MP + 10MP + 12MP Triple Rear',
      'Battery': '4000mAh, 25W Fast Charge',
      'RAM': '8GB',
      'Storage': '128GB / 256GB',
    }),
    variants: [
      { label: '128GB - Onyx Black', type: 'storage', value: '128GB - Onyx Black', priceModifier: 0 },
      { label: '256GB - Onyx Black', type: 'storage', value: '256GB - Onyx Black', priceModifier: 5000 },
      { label: '128GB - Marble Gray', type: 'storage', value: '128GB - Marble Gray', priceModifier: 0 },
      { label: '128GB - Cobalt Violet', type: 'storage', value: '128GB - Cobalt Violet', priceModifier: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, processingFee: 0 },
      { tenureMonths: 6, interestRate: 0, processingFee: 0 },
      { tenureMonths: 9, interestRate: 13, processingFee: 199 },
      { tenureMonths: 12, interestRate: 13, processingFee: 199 },
      { tenureMonths: 18, interestRate: 15, processingFee: 299 },
      { tenureMonths: 24, interestRate: 17, processingFee: 299 },
    ],
  },
  {
    brand: 'Sony',
    name: 'WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with 8 microphones and two processors. Up to 30 hours battery life, multipoint connection, and Speak-to-Chat technology. Crystal clear calls in any environment.',
    category: 'Audio',
    basePrice: 34990,
    discountedPrice: 26990,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    ]),
    specifications: JSON.stringify({
      'Driver': '30mm, dome type',
      'Frequency Response': '4Hz–40,000Hz',
      'Battery Life': '30 hours (NC on)',
      'Charging': 'USB-C, 3 min for 3 hours',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.2, 3.5mm',
    }),
    variants: [
      { label: 'Black', type: 'color', value: 'Black', priceModifier: 0 },
      { label: 'Platinum Silver', type: 'color', value: 'Platinum Silver', priceModifier: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, processingFee: 0 },
      { tenureMonths: 6, interestRate: 12, processingFee: 99 },
      { tenureMonths: 9, interestRate: 14, processingFee: 99 },
      { tenureMonths: 12, interestRate: 14, processingFee: 149 },
    ],
  },
  {
    brand: 'Apple',
    name: 'MacBook Air M2',
    description: 'Supercharged by the M2 chip, MacBook Air has a 13.6-inch Liquid Retina display, MagSafe charging, and up to 18 hours of battery life — all in a fanless design that\'s just 11.3mm thin.',
    category: 'Laptops',
    basePrice: 114900,
    discountedPrice: 109900,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
    ]),
    specifications: JSON.stringify({
      'Chip': 'Apple M2, 8-core CPU',
      'Display': '13.6-inch Liquid Retina, 2560×1664',
      'Memory': '8GB / 16GB unified memory',
      'Storage': '256GB / 512GB / 1TB SSD',
      'Battery': 'Up to 18 hours',
      'Ports': '2x Thunderbolt, MagSafe 3, 3.5mm',
    }),
    variants: [
      { label: '8GB / 256GB - Midnight', type: 'config', value: '8GB / 256GB - Midnight', priceModifier: 0 },
      { label: '8GB / 512GB - Midnight', type: 'config', value: '8GB / 512GB - Midnight', priceModifier: 15000 },
      { label: '16GB / 512GB - Midnight', type: 'config', value: '16GB / 512GB - Midnight', priceModifier: 25000 },
      { label: '8GB / 256GB - Starlight', type: 'config', value: '8GB / 256GB - Starlight', priceModifier: 0 },
      { label: '8GB / 256GB - Space Gray', type: 'config', value: '8GB / 256GB - Space Gray', priceModifier: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, processingFee: 0 },
      { tenureMonths: 6, interestRate: 0, processingFee: 0 },
      { tenureMonths: 9, interestRate: 13, processingFee: 299 },
      { tenureMonths: 12, interestRate: 13, processingFee: 299 },
      { tenureMonths: 18, interestRate: 15, processingFee: 399 },
      { tenureMonths: 24, interestRate: 16, processingFee: 499 },
    ],
  },
  {
    brand: 'OnePlus',
    name: 'OnePlus 12',
    description: 'The OnePlus 12 features the Snapdragon 8 Gen 3 processor, a 6.82-inch LTPO AMOLED display with 120Hz adaptive refresh, and the Hasselblad-tuned triple camera with periscope telephoto.',
    category: 'Smartphones',
    basePrice: 64999,
    discountedPrice: 59999,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    ]),
    specifications: JSON.stringify({
      'Display': '6.82-inch LTPO AMOLED, 120Hz',
      'Processor': 'Snapdragon 8 Gen 3',
      'Camera': '50MP Hasselblad Main + 64MP Periscope + 48MP Ultra Wide',
      'Battery': '5400mAh, 100W SUPERVOOC',
      'RAM': '12GB / 16GB',
      'OS': 'OxygenOS 14 (Android 14)',
    }),
    variants: [
      { label: '12GB / 256GB - Silky Black', type: 'config', value: '12GB / 256GB - Silky Black', priceModifier: 0 },
      { label: '16GB / 512GB - Silky Black', type: 'config', value: '16GB / 512GB - Silky Black', priceModifier: 5000 },
      { label: '12GB / 256GB - Flowy Emerald', type: 'config', value: '12GB / 256GB - Flowy Emerald', priceModifier: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, processingFee: 0 },
      { tenureMonths: 6, interestRate: 0, processingFee: 0 },
      { tenureMonths: 9, interestRate: 14, processingFee: 199 },
      { tenureMonths: 12, interestRate: 14, processingFee: 199 },
      { tenureMonths: 18, interestRate: 16, processingFee: 299 },
    ],
  },
  {
    brand: 'Samsung',
    name: 'Galaxy Tab S9',
    description: 'Galaxy Tab S9 brings the power of Samsung DeX and the versatility of the S Pen to an IP68-rated 11-inch Dynamic AMOLED 2X display. Powered by Snapdragon 8 Gen 2 with up to 12GB RAM.',
    category: 'Tablets',
    basePrice: 72999,
    discountedPrice: 66999,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
    ]),
    specifications: JSON.stringify({
      'Display': '11-inch Dynamic AMOLED 2X, 120Hz',
      'Processor': 'Snapdragon 8 Gen 2',
      'RAM': '8GB / 12GB',
      'Storage': '128GB / 256GB',
      'Battery': '8400mAh, 45W Fast Charge',
      'Water Resistance': 'IP68',
    }),
    variants: [
      { label: '8GB / 128GB - Graphite', type: 'config', value: '8GB / 128GB - Graphite', priceModifier: 0 },
      { label: '12GB / 256GB - Graphite', type: 'config', value: '12GB / 256GB - Graphite', priceModifier: 12000 },
      { label: '8GB / 128GB - Beige', type: 'config', value: '8GB / 128GB - Beige', priceModifier: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, processingFee: 0 },
      { tenureMonths: 6, interestRate: 0, processingFee: 0 },
      { tenureMonths: 9, interestRate: 13, processingFee: 199 },
      { tenureMonths: 12, interestRate: 13, processingFee: 199 },
      { tenureMonths: 18, interestRate: 15, processingFee: 299 },
    ],
  },
  {
    brand: 'Bose',
    name: 'QuietComfort 45',
    description: 'Bose QuietComfort 45 headphones deliver world-class noise cancellation with TriPort acoustic architecture. 24-hour battery, Aware Mode for ambient sound, and foldable for travel.',
    category: 'Audio',
    basePrice: 29900,
    discountedPrice: 22900,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
    ]),
    specifications: JSON.stringify({
      'Battery Life': '24 hours',
      'Charging': 'USB-C, 15 min for 3 hours',
      'Weight': '240g',
      'Connectivity': 'Bluetooth 5.1, 2.5mm',
      'Modes': 'QuietComfort (ANC) + Aware',
    }),
    variants: [
      { label: 'White Smoke', type: 'color', value: 'White Smoke', priceModifier: 0 },
      { label: 'Black', type: 'color', value: 'Black', priceModifier: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, processingFee: 0 },
      { tenureMonths: 6, interestRate: 12, processingFee: 99 },
      { tenureMonths: 9, interestRate: 13, processingFee: 99 },
      { tenureMonths: 12, interestRate: 14, processingFee: 149 },
    ],
  },
  {
    brand: 'Apple',
    name: 'Apple Watch Series 9',
    description: 'Apple Watch Series 9 features the new S9 chip with on-device Siri, double tap gesture, and a brighter Always-On Retina display. Carbon neutral in select configurations.',
    category: 'Wearables',
    basePrice: 41900,
    discountedPrice: 38900,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80',
    ]),
    specifications: JSON.stringify({
      'Chip': 'S9 SiP, 64-bit dual-core',
      'Display': 'Always-On Retina, up to 2000 nits',
      'Battery': '18 hours typical use',
      'Connectivity': 'GPS + Cellular (optional)',
      'Water Resistance': '50m WR',
      'Health': 'ECG, Blood Oxygen, Crash Detection',
    }),
    variants: [
      { label: '41mm - Midnight Aluminium', type: 'size', value: '41mm - Midnight', priceModifier: 0 },
      { label: '45mm - Midnight Aluminium', type: 'size', value: '45mm - Midnight', priceModifier: 3000 },
      { label: '41mm - Starlight Aluminium', type: 'size', value: '41mm - Starlight', priceModifier: 0 },
      { label: '45mm - Starlight Aluminium', type: 'size', value: '45mm - Starlight', priceModifier: 3000 },
      { label: '41mm - Pink Aluminium', type: 'size', value: '41mm - Pink', priceModifier: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, processingFee: 0 },
      { tenureMonths: 6, interestRate: 0, processingFee: 0 },
      { tenureMonths: 9, interestRate: 14, processingFee: 149 },
      { tenureMonths: 12, interestRate: 14, processingFee: 149 },
      { tenureMonths: 18, interestRate: 15, processingFee: 199 },
    ],
  },
];

async function main() {
  console.log('Seeding 1Fi Marketplace products with reliable high-res images...');

  // Clear existing data
  await prisma.order.deleteMany();
  await prisma.eMIPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.marketplaceProduct.deleteMany();

  for (const productData of products) {
    const { variants, emiPlans, ...productFields } = productData;

    const product = await prisma.marketplaceProduct.create({
      data: {
        ...productFields,
        variants: {
          create: variants,
        },
        emiPlans: {
          create: emiPlans,
        },
      },
    });

    console.log(`  ✓ ${product.brand} ${product.name}`);
  }

  console.log(`\nSeeded ${products.length} products successfully.`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
