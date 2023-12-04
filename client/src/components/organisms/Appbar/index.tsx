import React, { useContext } from 'react';
import styled from 'styled-components';

import { Input } from '@/components/atoms';
import { CategoriesContext } from '@/store/categories';
import Cart from '@/components/organisms/Cart';

const AppBarContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.platinum500};
  justify-content: space-between;
  padding: 10px;
  margin-top: -20px;
`;

const HomeText = styled.div`
  margin: auto 0;
`;

function AppBar() {
  const { searchText, setSearchText } = useContext(CategoriesContext);

  return (
    <AppBarContainer>
      <HomeText>Home24</HomeText>
      <div style={{ display: 'flex' }}>
        <Cart />
        <Input
          placeholder='Search'
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target?.value)}
        />
      </div>
    </AppBarContainer>
  );
}

export default AppBar;
