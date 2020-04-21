// The idea of the collection pattern is to contain all those logic code that we should not have in certain components.
// For example, in this case, our shop.component (ShopPage) should not have isCollectioFetching or isCollectionLoading,
// since that info is nor relevant for ShopPage component, it have nothing to do with it, so should be delegated to its
// appropiate components

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// compose allows us a better structured HOCs
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview)

// this is the same as:
// connect(mapStateToProps)(WithSpinner(CollectionsOverview)); Compose evaluates from right to left

export default CollectionsOverviewContainer;