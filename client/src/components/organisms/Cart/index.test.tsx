import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import Cart from '@/components/organisms/Cart';
import {
  CartItems,
  mockLocalStorage,
  mockRemoveFromCart,
  setMockCartItems
} from '@/utils/test/mock';
import { render } from '@/utils/test/render';

describe('Cart Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  it('renders without crashing', () => {
    render(<Cart />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('shows popover on mouse enter', () => {
    render(<Cart />);
    const menuContainer = screen.getByTestId('menu-container');
    fireEvent.mouseEnter(menuContainer);
    expect(screen.getByTestId('popover')).toBeVisible();
  });

  it('hides popover on mouse leave', () => {
    render(<Cart />);
    const menuContainer = screen.getByTestId('menu-container');
    fireEvent.mouseLeave(menuContainer);
    expect(screen.getByTestId('popover')).not.toBeVisible();
  });

  it('displays no items message when cart is empty', () => {
    render(<Cart />);
    expect(screen.getByText('No items in cart')).toBeInTheDocument();
  });

  it('displays correct number of cart items', () => {
    const mockItems: CartItems = {
      item1: {
        name: 'Item 1',
        count: 1,
        images: [{ path: 'image1.jpg' }],
        prices: { regular: { value: 10 } }
      },
      item2: {
        name: 'Item 2',
        count: 2,
        images: [{ path: 'image2.jpg' }],
        prices: { regular: { value: 20 } }
      }
    };
    setMockCartItems(mockItems);
    render(<Cart />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls removeFromCart when remove button is clicked', () => {
    const mockItems: CartItems = {
      item1: {
        name: 'Item 1',
        count: 1,
        images: [{ path: 'image1.jpg' }],
        prices: { regular: { value: 10 } }
      }
    };
    setMockCartItems(mockItems);
    render(<Cart />);
    const removeButton = screen.getByText('Remove').closest('button');
    // @ts-ignore
    fireEvent.click(removeButton);
    expect(mockRemoveFromCart).toHaveBeenCalled();
  });
});
