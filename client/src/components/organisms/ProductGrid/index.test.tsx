import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '@/utils/test/render';
import ProductGrid from '@/components/organisms/ProductGrid';
import { mockCategoryArticles } from '@/utils/test/mock';

describe('ProductGrid Component', () => {
  it('renders without crashing', () => {
    render(<ProductGrid />);
  });

  it('displays the correct number of ProductItems', () => {
    render(<ProductGrid />);
    const items = screen.getAllByTestId('product-item');
    expect(items.length).toBe(mockCategoryArticles.length);
  });

  it('displays correct content in ProductItems', () => {
    render(<ProductGrid />);
    mockCategoryArticles.forEach((article) => {
      expect(screen.getByText(article.name)).toBeInTheDocument();
    });
  });
});
