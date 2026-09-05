import { create } from 'zustand';
import { ProductVariant, EMIPlan } from '@/services/marketplaceService';

interface MarketplaceState {
  selectedVariant: ProductVariant | null;
  selectedEMIPlan: EMIPlan | null;
  setVariant: (variant: ProductVariant | null) => void;
  setEMIPlan: (plan: EMIPlan | null) => void;
  reset: () => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  selectedVariant: null,
  selectedEMIPlan: null,
  setVariant: (variant) => set({ selectedVariant: variant }),
  setEMIPlan: (plan) => set({ selectedEMIPlan: plan }),
  reset: () => set({ selectedVariant: null, selectedEMIPlan: null }),
}));
