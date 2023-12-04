import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '@/utils/test/render';
import Drawer from '@/components/organisms/Drawer';
import { mockChildrenCategories } from '@/utils/test/mock';

describe('Drawer Component', () => {
  it('renders without crashing', () => {
    render(<Drawer />);
  });

  it('displays the correct number of SidebarItems', () => {
    render(<Drawer />);
    const items = screen.getAllByTestId('sidebar-item');
    expect(items.length).toBe(mockChildrenCategories.length);
  });

  it('displays correct content in SidebarItems', () => {
    render(<Drawer />);
    mockChildrenCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });
});
