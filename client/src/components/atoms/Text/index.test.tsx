import React from 'react';
import 'jest-styled-components';

import { Text } from '@/components/atoms';
import { render } from '@/utils/test/render';

describe('Text component', () => {
  it('renders correctly', () => {
    const { container } = render(<Text />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has correct margin styling', () => {
    const { getByText } = render(<Text>Sample Text</Text>);
    const textComponent = getByText('Sample Text');
    expect(textComponent).toHaveStyleRule('margin', '5px 0');
  });
});
