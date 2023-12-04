// src/components/molecules/ProductItem.tsx
import React, { useContext } from 'react';
import styled from 'styled-components';

import { Image, Button, Text } from '@/components/atoms';
import { Article } from '@/models/articles';
import { currencyFormatter } from '@/utils/currencyFomatter';
import { CategoriesContext } from '@/store/categories';

const ProductCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.platinum500};
  padding: 15px;
  text-align: center;
  border-radius: 6px;
`;

const ProductName = styled(Text)`
  font-weight: bold;
`;

const ProductPrice = styled(Text)`
  color: ${({ theme }) => theme.colors.grey800};
`;

interface Props {
  article: Article;
}

function ProductItem({ article }: Props) {
  const { addToCart } = useContext(CategoriesContext);

  return (
    <ProductCard data-testid='product-item'>
      <Image src={article.images?.[0].path} alt={article.name} />
      <ProductName>{article.name}</ProductName>
      <ProductPrice>{currencyFormatter.format(article?.prices?.regular?.value ?? 0)}</ProductPrice>
      <Button onClick={() => addToCart(article)}>Add to Cart</Button>
    </ProductCard>
  );
}

export default ProductItem;
