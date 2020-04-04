import React from 'react';
import { connect } from 'react-redux';

import { removeItem, addItem, clearItemWhenZero } from '../../redux/cart/cart.actions';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, removeItem, addItem, clearItemWhenZero }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img alt='item' src={imageUrl} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => clearItemWhenZero(cartItem)}>&#10094;</div>
        <div className='value'>{quantity}</div>
        <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => removeItem(cartItem)}>&#10005;</div>
    </div>
  )
};

// Alternative way to traditional way, object instead a function
const mapDispatchToProps = {
  removeItem: (item) => removeItem(item),
  addItem: (item) => addItem(item),
  clearItemWhenZero: (item) => clearItemWhenZero(item)
}

export default connect(null, mapDispatchToProps)(CheckoutItem);