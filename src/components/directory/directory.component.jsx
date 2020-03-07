import React, { Component } from 'react';

import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';
import sections from '../../data/sections';

class Directory extends Component {
  state = {
    sections
  }

  render() {
    return (
      <div className='directory-menu' >
        {/* {...otherSectionProps} is equivalent to destructure all the elements of the object and pass them as title={title}... */}
        {this.state.sections.map(({ id, ...otherSectionProps }) => <MenuItem key={id} {...otherSectionProps} />)}
      </div >
    )
  };
};

export default Directory;