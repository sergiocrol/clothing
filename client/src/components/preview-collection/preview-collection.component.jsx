import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './preview-collection.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

const PreviewCollection = ({ title, items, match, ...otherProps }) => {
  const collectionLink = match.path + `/${{ ...otherProps }.routeName}`;
  return (
    <div className='collection-preview'>
      <h3 className='title'><Link to={collectionLink}>{title.toUpperCase()}</Link></h3>
      <div className='preview'>
        {
          items.filter((item, idx) => idx < 4).map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  )
}

export default withRouter(PreviewCollection);