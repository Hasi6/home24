import React from 'react';
import 'jest-styled-components';

import { Loading } from '@/components/atoms';
import { render } from '@/utils/test/render';

describe('<Loading /> component', () => {
  test('it renders correctly and has the correct styles', () => {
    const { container } = render(<Loading />);
    const loadingDiv = container.firstChild;

    expect(loadingDiv).toBeInTheDocument();

    // Check for style rules
    expect(loadingDiv).toHaveStyleRule('display', 'flex');
    expect(loadingDiv).toHaveStyleRule('justify-content', 'center');
    expect(loadingDiv).toHaveStyleRule('align-items', 'center');
    expect(loadingDiv).toHaveStyleRule('height', '100vh');
    expect(loadingDiv).toHaveStyleRule('font-size', '24px');
    expect(loadingDiv).toHaveStyleRule('color', '#666');
  });
});
