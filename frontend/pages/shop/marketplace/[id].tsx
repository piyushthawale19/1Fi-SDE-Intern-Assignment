import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AppBar } from '@/components/layout/AppBar';
import { ProductGallery } from '@/components/marketplace/ProductGallery';
import { VariantSelector } from '@/components/marketplace/VariantSelector';
import { EMIPlanSelector } from '@/components/marketplace/EMIPlanSelector';
import { SpecificationList } from '@/components/marketplace/SpecificationList';
import { ProductDetailSkeleton, ErrorState } from '@/components/ui/States';
import { marketplaceService, Product, ProductVariant, EMIPlan } from '@/services/marketplaceService';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency, getDiscountPercent } from '@/lib/emiUtils';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useAuthStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedEMIPlan, setSelectedEMIPlan] = useState<EMIPlan | null>(null);
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    setLoading(true);
    setError('');
    marketplaceService.getProduct(id)
      .then((data) => {
        setProduct(data);
        if (data.variants.length > 0) setSelectedVariant(data.variants[0]);
        if (data.emiPlans.length > 0) setSelectedEMIPlan(data.emiPlans[0]);
      })
      .catch(() => setError('Could not load product details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleProceed = async () => {
    if (!selectedEMIPlan || !product) return;

    if (!token) {
      router.push(`/auth/login?redirect=/shop/marketplace/${product.id}`);
      return;
    }

    setPlacing(true);
    setOrderError('');

    try {
      const order = await marketplaceService.placeOrder({
        productId: product.id,
        variantId: selectedVariant?.id,
        emiPlanId: selectedEMIPlan.id,
      });
      router.push(`/shop/marketplace/order-success?orderId=${order.id}`);
    } catch {
      setOrderError('Could not place your order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <MobileLayout showBottomNav={false}>
        <AppBar showBack title="Product Details" />
        <ProductDetailSkeleton />
      </MobileLayout>
    );
  }

  if (error || !product) {
    return (
      <MobileLayout showBottomNav={false}>
        <AppBar showBack title="Product Details" />
        <ErrorState message={error} onRetry={() => router.reload()} />
      </MobileLayout>
    );
  }

  const discount = getDiscountPercent(product.basePrice, product.discountedPrice);
  const displayPrice = selectedVariant
    ? product.discountedPrice + selectedVariant.priceModifier
    : product.discountedPrice;

  return (
    <>
      <Head>
        <title>{product.name} — 1Fi Marketplace</title>
        <meta name="description" content={`Buy ${product.brand} ${product.name} on easy EMI. ${product.description.slice(0, 100)}...`} />
      </Head>

      <MobileLayout showBottomNav={false}>
        <AppBar showBack />

        <div style={{ paddingBottom: '100px' }}>
          {/* Product Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Header */}
          <div className="product-detail-section">
            <div className="product-brand">{product.brand}</div>
            <h1 className="product-name">{product.name}</h1>

            <div className="product-price-block">
              <span className="product-price-sale">{formatCurrency(displayPrice)}</span>
              {discount > 0 && (
                <>
                  <span className="product-price-original">{formatCurrency(product.basePrice)}</span>
                  <span className="product-price-discount">{discount}% off</span>
                </>
              )}
            </div>

            <p className="product-description">{product.description}</p>
          </div>

          {/* Trust Badges */}
          <div style={{
            margin: '0 16px 16px',
            padding: '12px 14px',
            background: 'var(--primary-light)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-around',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--primary)',
          }}>
            <span>⚡ Instant EMI Approval</span>
            <span>🛡️ 1Fi Assured</span>
            <span>🚚 Free Express Shipping</span>
          </div>

          {/* Variant Selection */}
          {product.variants.length > 0 && (
            <div className="product-detail-section">
              <h2 className="section-title">Select Model / Variant</h2>
              <VariantSelector
                variants={product.variants}
                selected={selectedVariant}
                onSelect={setSelectedVariant}
              />
            </div>
          )}

          {/* EMI Plans */}
          <div className="product-detail-section">
            <h2 className="section-title">Choose Easy EMI Plan</h2>
            <EMIPlanSelector
              plans={product.emiPlans}
              selected={selectedEMIPlan}
              onSelect={setSelectedEMIPlan}
            />
          </div>

          {/* Specifications */}
          {Object.keys(product.specifications).length > 0 && (
            <div className="product-detail-section">
              <h2 className="section-title">Key Specifications</h2>
              <SpecificationList specs={product.specifications} />
            </div>
          )}

          {/* Order error */}
          {orderError && (
            <div style={{ padding: '0 16px 12px' }}>
              <div className="alert alert-error">{orderError}</div>
            </div>
          )}
        </div>

        {/* Floating Bottom Purchase Bar (anchored inside mobile shell) */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '1px solid var(--border)',
          padding: '12px 16px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50,
          marginTop: '-80px',
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {formatCurrency(displayPrice)}
            </div>
            {selectedEMIPlan && (
              <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginTop: '2px' }}>
                {formatCurrency(selectedEMIPlan.monthlyAmount)}/mo × {selectedEMIPlan.tenureMonths} mos
              </div>
            )}
          </div>

          <button
            id="proceed-btn"
            className="btn btn-primary"
            onClick={handleProceed}
            disabled={placing || !selectedEMIPlan}
            style={{
              padding: '12px 28px',
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '12px',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
            }}
          >
            {placing ? 'Processing...' : token ? 'Proceed' : 'Sign in to Buy'}
          </button>
        </div>
      </MobileLayout>
    </>
  );
}
