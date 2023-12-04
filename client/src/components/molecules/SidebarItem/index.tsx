import React from 'react';
import styled from 'styled-components';

export interface SidebarMenuItem {
  link: string;
  title: string;
}

interface Props {
  item: SidebarMenuItem;
}

const SidebarItemContainer = styled.div`
  border-radius: 6px;
  padding: 10px;

  &:hover .title {
    color: grey;
  }

  &:hover {
    background-color: grey;
  }

  &.selected {
    background-color: gray;

    > .link {
      > .title {
        color: grey;
      }
    }
  }
`;

const Link = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;

  > .title {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 8px;
    color: gray;
  }

  > .notification {
    background-color: red;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    padding-left: 8px;
    padding-right: 8px;
    position: absolute;
    right: 0;
    border-radius: 4px;
  }

  > .notificationIcon {
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    left: 18px;
  }
`;

function SidebarItem({ item }: Props) {
  return (
    <SidebarItemContainer className='SidebarItem'>
      <Link className='link relative'>
        <div data-testid='title' className='title transition-opacity duration-300'>
          {item.title}
        </div>
      </Link>
    </SidebarItemContainer>
  );
}

export default SidebarItem;
