/*
  The idea of memoization is to re-render the components only when is necessary to do it.
  By how react-redux works, every time the state object is recomposed, all the connected components (connect func) will
  be re-rendered, even if they are not related with the property changed in the state (so, for example if we have in the state, 
  a cart property, and a user property, every change in user property will fire the mapStateToProp of cart too, and will be re-rendered).
  With reselect library, we can decide which selectors will be exposed to the change. So here, only when there is a change in 
  selectCartItems the component will be re-rendered.
*/
import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity,
    0
  )
);