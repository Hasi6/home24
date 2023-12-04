import React, { useContext } from 'react';

import { CategoriesContext } from '@/store/categories';
import ProductGrid from '@/components/organisms/ProductGrid';

function ProductPage() {
  const { articleCount, name } = useContext(CategoriesContext);

  return (
    <div>
      <h1>
        {name}({articleCount})
      </h1>
      <ProductGrid />
    </div>
  );
}

export default ProductPage;
