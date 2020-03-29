import React, { Component } from 'react';

import SHOP_DATA from '../../data/shop';
import PreviewCollection from '../../components/preview-collection/preview-collection.component';

class ShopPage extends Component {
  state = {
    collections: SHOP_DATA
  }

  render() {
    const collections = this.state.collections;
    return (
      <div className='shop-page'>
        <h1>Collections</h1>
        {
          collections.map(({ id, ...otherCollectionProps }) => <PreviewCollection key={id} {...otherCollectionProps} />)
        }
      </div>
    );
  }
};

export default ShopPage;