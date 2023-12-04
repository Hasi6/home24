import React from 'react';
import 'jest-styled-components';

import { Image } from '@/components/atoms';
import { render } from '@/utils/test/render';

describe('Image component', () => {
  it('renders correctly', () => {
    const { container } = render(<Image />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has correct initial styles', () => {
    const { getByTestId } = render(<Image data-testid='image' src={'./'} alt={'image'} />);
    const image = getByTestId('image');
    expect(image).toHaveStyleRule('width', '100%');
    expect(image).toHaveStyleRule('height', '150px');
    expect(image).toHaveStyleRule('object-fit', 'cover');
  });
});
