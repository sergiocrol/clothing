import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selector';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {
          items.map(item => <CollectionItem key={item.id} item={item} />)
        }
      </div>
    </div>
  )
};

// ownProps are the props of our CollectionPage component
const mapStateToProps = (state, ownProps) => ({
  // We use selectCollection(...)(state), bacause without createStructuredSelector we must pass 'state', but at the same time,
  // if we check selectCollection selector, is a function which receive another function, so that's why the double call
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);