import api from '@/lib/axios';

export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  discountedPrice: number;
  images: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
}

export interface ProductVariant {
  id: string;
  label: string;
  type: string;
  value: string;
  priceModifier: number;
  available: boolean;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  interestRate: number;
  processingFee: number;
  monthlyAmount: number;
  totalPayable: number;
}

export const marketplaceService = {
  async getProducts(params?: { search?: string; category?: string; brand?: string }) {
    const { data } = await api.get('/marketplace/products', { params });
    return data.data as Product[];
  },

  async getProduct(id: string) {
    const { data } = await api.get(`/marketplace/products/${id}`);
    return data.data as Product;
  },

  async getCategories() {
    const { data } = await api.get('/marketplace/categories');
    return data.data as string[];
  },

  async placeOrder(payload: { productId: string; variantId?: string; emiPlanId: string }) {
    const { data } = await api.post('/orders', payload);
    return data.data;
  },

  async getOrder(id: string) {
    const { data } = await api.get(`/orders/${id}`);
    return data.data;
  },

  async getUserOrders() {
    const { data } = await api.get('/orders');
    return data.data;
  },
};
