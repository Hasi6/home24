import { Article } from '@/models/articles';

export interface ChildrenCategory {
  name: string;
  urlPath: string;
}

export interface CategoriesResponse {
  articleCount: number;
  categoryArticles: {
    articles: Article[];
  };
  childrenCategories: {
    list: ChildrenCategory[];
  };
  name: string;
}
