import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    <nav className="nav nav-pills nav-fill">
      <NavLink data-test="link-all" activeClassName="active" className="nav-item nav-link" to="/home">All</NavLink>
      <NavLink data-test="link-completed" activeClassName="active" className="nav-item nav-link" to="/completed">Completed</NavLink>
      <NavLink data-test="link-trash" activeClassName="active" className="nav-item nav-link" to="/trash">Trash</NavLink>
      <NavLink data-test="link-create" activeClassName="active" className="nav-item nav-link" to="/todo">Create</NavLink>
    </nav>
  );
};

export default Header;
