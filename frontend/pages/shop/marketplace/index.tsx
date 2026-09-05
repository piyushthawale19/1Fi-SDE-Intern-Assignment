import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AppBar } from '@/components/layout/AppBar';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ProductCardSkeleton, EmptyState, ErrorState } from '@/components/ui/States';
import { marketplaceService, Product } from '@/services/marketplaceService';

export default function MarketplacePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeBrand, setActiveBrand] = useState<string>('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sync router params ONLY when router.isReady is true
  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.brand && typeof router.query.brand === 'string') {
      setActiveBrand(router.query.brand);
    } else {
      setActiveBrand('');
    }

    if (router.query.search && typeof router.query.search === 'string') {
      setSearch(router.query.search);
      setDebouncedSearch(router.query.search);
    }
  }, [router.isReady, router.query.brand, router.query.search]);

  // Debounce search input — avoid hammering the API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = useCallback(async () => {
    if (!router.isReady) return;

    setLoading(true);
    setError('');
    try {
      const params: { search?: string; category?: string; brand?: string } = {};

      // Priority: use activeBrand from state or directly from router.query if available
      const brandParam = activeBrand || (typeof router.query.brand === 'string' ? router.query.brand : '');
      const searchParam = debouncedSearch || (typeof router.query.search === 'string' ? router.query.search : '');

      if (searchParam) params.search = searchParam;
      if (activeCategory !== 'all') params.category = activeCategory;
      if (brandParam) params.brand = brandParam;

      const data = await marketplaceService.getProducts(params);
      setProducts(data);
    } catch {
      setError('Could not load products. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [router.isReady, router.query.brand, router.query.search, debouncedSearch, activeCategory, activeBrand]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    marketplaceService.getCategories().then(setCategories).catch(() => {});
  }, []);

  const handleClearBrand = () => {
    setActiveBrand('');
    const query = { ...router.query };
    delete query.brand;
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>{activeBrand ? `${activeBrand} Products` : '1Fi Marketplace'} — Shop on EMI</title>
        <meta name="description" content="Browse smartphones, laptops, audio and more. Buy now, pay in easy EMIs with 1Fi." />
      </Head>
      <MobileLayout>
        <AppBar title={activeBrand ? `${activeBrand} Store` : '1Fi Marketplace'} showBack />

        {/* Search */}
        <div className="marketplace-search-bar" style={{ background: '#FAF8FF' }}>
          <div className="search-input-wrap" style={{ background: '#F1ECFD', border: '1px solid #E2D9FA' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="marketplace-search"
              type="search"
              placeholder="Search phones, laptops, audio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', padding: 0, lineHeight: 1 }}
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Active Brand Filter Tag (if filtered by brand) */}
        {activeBrand && (
          <div style={{
            padding: '10px 16px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FAF8FF',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Filtered by Brand:</span>
              <span className="badge badge-primary" style={{ fontSize: '12px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {activeBrand}
                <button
                  onClick={handleClearBrand}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, padding: 0, lineHeight: 1 }}
                >
                  ✕
                </button>
              </span>
            </div>
            <button
              onClick={handleClearBrand}
              style={{ background: 'none', border: 'none', fontSize: '12px', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
            >
              Show All Brands
            </button>
          </div>
        )}

        {/* Category tabs */}
        <div className="category-tabs" role="tablist" aria-label="Product categories" style={{ background: '#FAF8FF' }}>
          <button
            id="cat-all"
            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
            role="tab"
            aria-selected={activeCategory === 'all'}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchProducts} />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products found"
            description={activeBrand ? `No products available for brand "${activeBrand}"` : debouncedSearch ? `No results for "${debouncedSearch}"` : 'Check back soon for new arrivals.'}
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            }
          />
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </MobileLayout>
    </>
  );
}
