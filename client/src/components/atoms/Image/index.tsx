import styled from 'styled-components';

export const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;

  @media ${(props) => props.theme.media.sm} {
    height: 200px;
  }

  @media ${(props) => props.theme.media.md} {
    height: 250px;
  }
`;
