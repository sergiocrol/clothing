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
        {this.state.sections.map(section => <MenuItem key={section.id} section={section} />)}
      </div >
    )
  };
};

export default Directory;