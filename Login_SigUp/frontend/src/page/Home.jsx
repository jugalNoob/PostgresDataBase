import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
    <NavLink to='/'>home</NavLink>
    <br />
    <NavLink to='/form'>form</NavLink>
    <br />
    <NavLink to='/login'>login</NavLink>
    <br />
    <NavLink to='/dash'>dash</NavLink>
      
    </div>
  )
}

export default Home
