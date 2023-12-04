import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { ArticlesWithCount, CategoriesContext } from '@/store/categories';
import { Button as BaseButton, Button } from '@/components/atoms';
import { currencyFormatter } from '@/utils/currencyFomatter';
import { cart } from '@/assets/svgs';

const MenuContainer = styled.div`
  position: relative;
`;

const Popover = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 10;
  width: 300px;
  border-radius: 6px;
  max-height: 400px;
  overflow-y: auto;
`;

const MenuItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  margin: 0 10px;
  color: ${({ theme }) => theme.colors.grey800};

  img {
    margin-right: 5px;
    width: 12px;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const ItemName = styled.div`
  color: ${({ theme }) => theme.colors.platinum800};
  font-weight: bold;
`;

const ItemPrice = styled.div`
  color: ${({ theme }) => theme.colors.platinum800};
`;

function Cart() {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopover = () => setIsVisible(!isVisible);

  const { removeFromCart } = useContext(CategoriesContext);

  const getCartItems = (): ArticlesWithCount[] => {
    const itemsString = localStorage.getItem('items');
    return itemsString ? Object.values(JSON.parse(itemsString)) : [];
  };

  const cartItems = getCartItems();

  return (
    <MenuContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      data-testid='menu-container'
    >
      <StyledButton onClick={togglePopover}>
        <img src={cart} alt='cart' />
        {cartItems.length}
      </StyledButton>
      <Popover isVisible={isVisible} data-testid='popover'>
        {cartItems.length === 0 ? (
          <MenuItem>No items in cart</MenuItem>
        ) : (
          cartItems.map((item, index) => (
            <MenuItem key={index}>
              <Image src={item.images[0].path} alt={item.name} />
              <div>
                <ItemName>
                  {item.name} ({item.count})
                </ItemName>
                <ItemPrice>{currencyFormatter.format(item?.prices?.regular?.value ?? 0)}</ItemPrice>
                <Button style={{ background: 'red' }} onClick={() => removeFromCart(item.name)}>
                  Remove
                </Button>
              </div>
            </MenuItem>
          ))
        )}
      </Popover>
    </MenuContainer>
  );
}

export default Cart;
