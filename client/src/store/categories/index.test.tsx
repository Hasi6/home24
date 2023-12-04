import React, { useContext } from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';

import { CategoriesProvider, CategoriesContext } from '@/store/categories';
import useGraphQL from '@/hooks/useGraphQL';

jest.mock('@/hooks/useGraphQL');

const TestConsumerComponent = () => {
  const context = useContext(CategoriesContext);

  return (
    <>
      <div data-testid='articleCount'>{context.articleCount}</div>
      <div data-testid='loading'>{context.loading ? 'Loading' : 'Not Loading'}</div>
      <button onClick={() => context.setSearchText('test')}>Set Search Text</button>
    </>
  );
};

describe('CategoriesProvider Tests', () => {
  beforeEach(() => {
    // @ts-ignore
    useGraphQL.mockReturnValue({
      data: {
        categories: [
          {
            name: 'Category 1',
            articleCount: 10,
            categoryArticles: { articles: [{ name: 'Article 1' }] },
            childrenCategories: {
              list: [{ name: 'Child Category 1', urlPath: '/child1' }]
            }
          }
        ],
        loading: false
      }
    });
  });

  test('provides correct context values', () => {
    render(
      <CategoriesProvider>
        <TestConsumerComponent />
      </CategoriesProvider>
    );

    expect(screen.getByTestId('articleCount').textContent).toBe('10');
    expect(screen.getByTestId('loading').textContent).toBe('Not Loading');
  });

  test('updates context values with setPageSize and setSearchText', () => {
    render(
      <CategoriesProvider>
        <TestConsumerComponent />
      </CategoriesProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Set Search Text'));
    });
  });
});
