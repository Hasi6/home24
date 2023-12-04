import React from 'react';
import { screen } from '@testing-library/react';
import 'jest-styled-components';

import Footer from '@/components/organisms/Footer';
import { render } from '@/utils/test/render';

describe('Footer', () => {
  it('renders the footer and applies the correct styles', () => {
    render(<Footer />);

    const footerElement = screen.getByText(
      `Copyright ${new Date().getFullYear()} Home24. All rights reserved.`
    );
    expect(footerElement).toBeInTheDocument();
  });
});
