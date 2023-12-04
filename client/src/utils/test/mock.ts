import { Article } from '@/models/articles';

export const mockAddToCart = jest.fn();
export const mockSetSearchText = jest.fn();
export const mockRemoveFromCart = jest.fn();

export const mockChildrenCategories = [
  { name: 'Category 1', urlPath: '/category-1' },
  { name: 'Category 2', urlPath: '/category-2' }
];

export const mockCategoryArticles: Article[] = [
  {
    name: 'Product 1',
    images: [{ path: '/' }],
    prices: { currency: '$', regular: { value: 100 } },
    variantName: 'Product 2'
  },
  {
    name: 'Product 2',
    images: [{ path: '/' }],
    prices: { currency: '$', regular: { value: 100 } },
    variantName: 'Product 2'
  }
];

export const mockContextValue = {
  addToCart: mockAddToCart,
  articleCount: 0,
  cartItems: {},
  categoryArticles: mockCategoryArticles,
  childrenCategories: mockChildrenCategories,
  loading: false,
  name: null,
  removeFromCart: mockRemoveFromCart,
  searchText: '',
  setSearchText: mockSetSearchText
};

interface MockLocalStorage {
  clear: () => void;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  store: Record<string, string>;
}

export const mockLocalStorage: MockLocalStorage = {
  clear() {
    this.store = {};
  },
  getItem(key: string) {
    return this.store[key] || null;
  },
  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  },
  store: {}
};

interface CartItem {
  name: string;
  count: number;
  images: { path: string }[];
  prices: { regular: { value: number } };
}

export interface CartItems {
  [key: string]: CartItem;
}

export const setMockCartItems = (items: CartItems) => {
  mockLocalStorage.setItem('items', JSON.stringify(items));
};
