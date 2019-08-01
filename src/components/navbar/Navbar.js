import React from 'react';
import {Link } from 'react-router-dom';

function Navbar(props) {

  return (
    <nav>
      <Link to="/"> Home</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/projects"> Projects</Link>
    </nav>
  )
}

export default Navbar;