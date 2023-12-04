import React, { useContext } from 'react';
import styled from 'styled-components';

import SidebarItem from '@/components/molecules/SidebarItem';
import { CategoriesContext } from '@/store/categories';

const DrawerContainer = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.grey800};
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  padding: 24px;
  overflow: auto;

  .item {
    margin-top: 20px;
    &:first-child {
      margin-top: 0px;
    }
  }
`;

function Drawer() {
  const { childrenCategories } = useContext(CategoriesContext);

  return (
    <DrawerContainer>
      <div>
        {childrenCategories.map((item, index) => (
          <div className='item' key={index} data-testid='sidebar-item'>
            <SidebarItem item={{ link: item.urlPath, title: item.name }} />
          </div>
        ))}
      </div>
    </DrawerContainer>
  );
}

export default Drawer;
