import React, { ReactNode, useState } from 'react';

import useGraphQL from '@/hooks/useGraphQL';
import { Article } from '@/models/articles';
import { CategoriesResponse, ChildrenCategory } from '@/models/categories';
import { toast } from 'react-toastify';

export type ArticlesWithCount = Article & { count: number };

interface CartItem {
  [key: string]: ArticlesWithCount;
}

interface CategoriesContextProps {
  addToCart: (article: Article) => void;
  articleCount: number;
  cartItems: CartItem;
  categoryArticles: Article[];
  childrenCategories: ChildrenCategory[];
  loading: boolean;
  name: string | null;
  removeFromCart: (name: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const CategoriesContext = React.createContext<CategoriesContextProps>({
  addToCart: () => {},
  articleCount: 0,
  cartItems: {},
  categoryArticles: [],
  childrenCategories: [],
  loading: false,
  name: null,
  removeFromCart: () => {},
  searchText: '',
  setSearchText: () => {}
});

interface CategoriesProviderProps {
  children: ReactNode;
}

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [searchText, setSearchText] = useState('');
  const [cartItems, setCartItems] = useState<CartItem>({});

  const { data, loading } = useGraphQL<{ categories: CategoriesResponse[] }>(
    `{
        categories: productLists(ids: "156126", locale: de_DE) {
          name
          articleCount
          childrenCategories: childrenProductLists {
            list {
              name
              urlPath
            }
          }
          categoryArticles: articlesList(first: 50) {
            articles {
              name
              variantName
              prices {
                currency
                regular {
                  value
                }
              }
              images(
                format: WEBP
                maxWidth: 200
                maxHeight: 200
                limit: 1
              ) {
                path
              }
            }
          }
        }
      }`,
    {}
  );

  const articleCount = data?.categories?.[0]?.articleCount || 0;
  const categoryArticles = data?.categories?.[0]?.categoryArticles?.articles || [];
  const childrenCategories = data?.categories?.[0]?.childrenCategories?.list || [];
  const name = data?.categories?.[0]?.name || '';

  const categories = categoryArticles.filter((article) =>
    article.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToCart = (article: Article) => {
    try {
      const itemsString = localStorage.getItem('items');
      let items: CartItem = itemsString ? JSON.parse(itemsString || '{}') : {};

      if (items[article.name]) {
        items[article.name].count = (items[article.name].count || 1) + 1;
      } else {
        items[article.name] = { ...article, count: 1 };
      }

      setCartItems(items);
      localStorage.setItem('items', JSON.stringify(items));
      toast.success('Item Added Successfully');
    } catch (err) {
      toast.error('Something went Wrong. Please try again.');
    }
  };

  const removeFromCart = (articleName: string) => {
    try {
      setCartItems((prevItems) => {
        const updatedItems = { ...prevItems };
        delete updatedItems[articleName];
        localStorage.setItem('items', JSON.stringify(updatedItems));
        return updatedItems;
      });
      toast.info('Item removed Successfully');
    } catch (err) {
      toast.success('Something went Wrong. Please try again.');
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        addToCart,
        articleCount,
        cartItems,
        categoryArticles: categories,
        childrenCategories,
        loading,
        name,
        removeFromCart,
        searchText,
        setSearchText
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
