import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
   
      <NavLink to="/">home</NavLink>
      <br />
      <NavLink to="/get">get_Api</NavLink>
      <br />
      <NavLink to="/form">from</NavLink>
    </div>
  )
}

export default Home
