export interface RawProduct {
  name: string;
  composition: string;
  price: string;
}

export interface RawCategoryGroup {
  category: string;
  products: RawProduct[];
}

export interface Product extends RawProduct {
  id: string;
  category: string;
  brandVariant: string;
  strengthBadge: string;
  formType: 'Tablet' | 'Capsule' | 'Extended Release' | 'Bilayered' | 'Sustained Release';
  accentGradient: string;
  badgeColor: string;
  glowColor: string;
  indications: string[];
  therapeuticArea: string;
  packagingUnit: string;
  scheduleCategory: string;
  isActiveCompound: boolean;
}

export type SortMode = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  sortMode: SortMode;
  inStockOnly: boolean;
}

