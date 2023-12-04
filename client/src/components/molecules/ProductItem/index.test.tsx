import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import ProductItem from '@/components/molecules/ProductItem';
import { Article } from '@/models/articles';
import { mockAddToCart } from '@/utils/test/mock';
import { render } from '@/utils/test/render';

const mockArticle: Article = {
  name: 'Test Product',
  images: [{ path: 'test-image-url' }],
  prices: {
    regular: {
      value: 100
    },
    currency: '€'
  },
  variantName: 'Test Product'
};

describe('ProductItem', () => {
  it('renders the ProductItem component with article details', () => {
    render(<ProductItem article={mockArticle} />);

    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('100,00 €')).toBeInTheDocument();
  });

  it('calls addToCart when the button is clicked', () => {
    render(<ProductItem article={mockArticle} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(mockArticle);
  });
});
