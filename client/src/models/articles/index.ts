interface ArticleImage {
  path: string;
}

interface ArticlePriceRegular {
  value: number;
}

interface ArticlePrice {
  currency: string;
  regular: ArticlePriceRegular;
}

export interface Article {
  images: ArticleImage[];
  name: string;
  prices: ArticlePrice;
  variantName: string;
}
