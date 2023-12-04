import React, { ReactNode, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Drawer from '@/components/organisms/Drawer';
import useWindowSize from '@/hooks/useWindowSize';
import AppBar from '@/components/organisms/Appbar';
import Footer from '@/components/organisms/Footer';
import { CategoriesContext } from '@/store/categories';

const GlobalStyles = createGlobalStyle`
  * {
    &::-webkit-scrollbar {
      width: 6px; // Width of the scrollbar
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.white}; 
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.platinum600};
      border-radius: 3px; 
      &:hover {
        background: ${({ theme }) => theme.colors.platinum800};
      }

      /* For Firefox */
      scrollbar-width: thin;
      scrollbar-color: ${({ theme }) => `${theme.colors.platinum600} ${theme.colors.white}`};
    }
  }
`;

const AppLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.cultured300};
`;

const ScrollingContent = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
`;

const Content = styled.div`
  flex: 1;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  children: ReactNode;
}

function AppLayout(props: Props) {
  const { width } = useWindowSize();
  const { loading } = useContext(CategoriesContext);

  const getWidth = () => {
    if (width < 1920) {
      return width - 312;
    }

    return 1920 - 312;
  };

  return (
    <>
      <GlobalStyles />
      {loading ? (
        <Main>Loading...</Main>
      ) : (
        <AppLayoutContainer>
          <Drawer />
          <Main>
            <ScrollingContent style={{ width: getWidth() }}>
              <AppBar />
              <Content>{props.children}</Content>
              <Footer />
            </ScrollingContent>
          </Main>
        </AppLayoutContainer>
      )}
    </>
  );
}

export default AppLayout;
