import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <MenuItemContainer
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroundImageContainer
      className='background-image'
      imageUrl={imageUrl}
    />
    <ContentContainer className='content'>
      <ContentTitle>{title.toUpperCase()}</ContentTitle>
      <ContentSubtitle>SHOP NOW</ContentSubtitle>
    </ContentContainer>
  </MenuItemContainer>
);

// withRouter is a HOC that provides access to history, match an location, to the component passed as an argument.
// we can only get access to "history, match and location" that react-router-dom gives us, in
// the first component we pass in Route (in this case -> App.js -> Route -> component={Homepage}), so in order 
// to not pass all the props through all the children, we can use this HOC.
export default withRouter(MenuItem);