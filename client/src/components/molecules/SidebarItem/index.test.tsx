import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { render } from '@/utils/test/render';
import SidebarItem from '@/components/molecules/SidebarItem';

describe('SidebarItem Component Tests', () => {
  const item = { link: '/test-link', title: 'Test Title' };

  test('renders SidebarItem component with title', () => {
    render(<SidebarItem item={item} />);
    expect(screen.getByTestId('title').textContent).toBe(item.title);
  });

  test('applies hover styles', () => {
    render(<SidebarItem item={item} />);
    // @ts-ignore
    const container = screen.getByTestId('title')?.parentElement.parentElement as HTMLElement;
    fireEvent.mouseOver(container);
  });

  test('applies selected state styles', () => {
    render(<SidebarItem item={item} />);
    // @ts-ignore
    const container = screen.getByTestId('title').parentElement.parentElement;
    // @ts-ignore
    container.classList.add('selected');
  });
});
