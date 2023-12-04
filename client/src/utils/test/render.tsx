import { render as testingLibraryRender } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/theme/index';
import { CategoriesContext } from '@/store/categories';
import { mockContextValue } from '@/utils/test/mock';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={theme}>
        <CategoriesContext.Provider value={mockContextValue}>{children}</CategoriesContext.Provider>
      </ThemeProvider>
    )
  });
}
