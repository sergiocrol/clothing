import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div className={`menu-item ${size}`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

// withRouter is a HOC that provides access to history, match an location, to the component passed as an argument.
// we can only get access to "history, match and location" that react-router-dom gives us, in
// the first component we pass in Route (in this case -> App.js -> Route -> component={Homepage}), so in order 
// to not pass all the props through all the children, we can use this HOC.
export default withRouter(MenuItem);