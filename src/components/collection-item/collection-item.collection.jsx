import React from 'react';

import './collection-item.styles.scss';

const CollectionItem = ({ name, price, imageUrl }) => (
  <div className='collection-item'>
    <div className='image' style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <spans className='price'>{price}€</spans>
    </div>
  </div>
);

export default CollectionItem;