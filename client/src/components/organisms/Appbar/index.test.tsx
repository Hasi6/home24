import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import AppBar from '@/components/organisms/Appbar';
import { mockSetSearchText } from '@/utils/test/mock';
import { render } from '@/utils/test/render';

jest.mock('@/assets/svgs', () => 'mockedSvgPath');

describe('AppBar', () => {
  it('renders the AppBar component with an input for search', () => {
    render(<AppBar />);

    expect(screen.getByText('Home24')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('calls setSearchText when the search input is changed', () => {
    render(<AppBar />);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'New search text' } });
    expect(mockSetSearchText).toHaveBeenCalledWith('New search text');
  });
});
