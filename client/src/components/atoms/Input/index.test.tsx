import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { render } from '@/utils/test/render';
import { Input } from '@/components/atoms';

describe('Input Component Tests', () => {
  it('renders Input component', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    const placeholderText = 'Enter text';
    render(<Input placeholder={placeholderText} />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it('applies initial styles', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle('border: 2px solid #ccc');
    expect(input).toHaveStyle('background-color: #fff');
  });

  it('changes style when disabled', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle('background-color: #f5f5f5');
    expect(input).toHaveStyle('color: #bbb');
  });

  it('updates value on change', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    // @ts-ignore
    expect(input.value).toBe('test');
  });

  it('accepts custom props', () => {
    const customClass = 'custom-class';
    render(<Input className={customClass} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(customClass);
  });
});
