import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.platinum600};
  color: white;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.platinum800};
  }
`;
