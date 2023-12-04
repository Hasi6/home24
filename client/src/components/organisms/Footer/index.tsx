import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  color: $grey-400;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 9.99px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.4px;
`;

function Footer() {
  return (
    <StyledFooter>Copyright {new Date().getFullYear()} Home24. All rights reserved.</StyledFooter>
  );
}

export default Footer;
