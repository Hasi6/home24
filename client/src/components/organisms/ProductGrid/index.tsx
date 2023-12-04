import React, { useContext } from 'react';
import styled from 'styled-components';

import { CategoriesContext } from '@/store/categories';
import ProductItem from '@/components/molecules/ProductItem';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  padding-bottom: 60px;

  @media ${(props) => props.theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${(props) => props.theme.media.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${(props) => props.theme.media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

function ProductGrid() {
  const { categoryArticles } = useContext(CategoriesContext);

  return (
    <GridContainer>
      {categoryArticles.map((article, index) => (
        <ProductItem key={index} article={article} />
      ))}
    </GridContainer>
  );
}

export default ProductGrid;
