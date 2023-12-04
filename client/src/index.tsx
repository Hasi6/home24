import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import ProductPage from '@/pages/ProductPage';
import AppLayout from '@/components/templates/AppLayout';
import { theme } from '@/theme/index';
import { CategoriesProvider } from '@/store/categories';
import ErrorBoundary from '@/components/hoc/ErrorBoundary';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <div style={{ maxWidth: '1920px', margin: 'auto' }}>
        <ThemeProvider theme={theme}>
          <CategoriesProvider>
            <AppLayout>
              <ToastContainer />
              <ProductPage />
            </AppLayout>
          </CategoriesProvider>
        </ThemeProvider>
      </div>
    </ErrorBoundary>
  </React.StrictMode>
);
