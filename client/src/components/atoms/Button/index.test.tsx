import React from 'react';
import 'jest-styled-components';

import { Button } from '@/components/atoms';
import { render } from '@/utils/test/render';
import { theme } from '@/theme/index';

describe('Button component', () => {
  it('renders correctly', () => {
    const { container } = render(<Button />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has correct initial styles', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveStyleRule('padding', '10px');
    expect(button).toHaveStyleRule('background-color', theme.colors.platinum600);
    expect(button).toHaveStyleRule('color', 'white');
    expect(button).toHaveStyleRule('cursor', 'pointer');
  });

  it('changes background on hover', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveStyleRule('background-color', theme.colors.platinum800, {
      modifier: ':hover'
    });
  });
});
