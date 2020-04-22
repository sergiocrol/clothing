import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// we got access to match because ShopPage component is rendering from Route inside App.js, and ROute pass as props, automatically
// match and history props.
const ShopPage = ({ fetchCollectionsStartAsync, match }) => {
  // this would also work with an empty array, but in order to avoid the warning message we can use this prop, that we 
  // now is comming from mapDispatchToProps and will never change. [We are using it into useEffect, and Hooks is not aware that 
  // is not comming from connect function, but from mapDispatchToProps (in other words, it think that the state changes) so triggers the warning]
  useEffect(() => {
    fetchCollectionsStartAsync();
  }, [fetchCollectionsStartAsync]);

  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);