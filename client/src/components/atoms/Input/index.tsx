import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled.input`
  padding: 8px 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 2px 5px rgba(0, 112, 243, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #bbb;
  }
`;

export function Input(props: Props) {
  return <StyledInput type='text' {...props} />;
}
