import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => {
  // setTimeout(() => {
  //   props.history.push('/about') // programmatic redirect
  // }, 2000)
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <Link className="brand-logo" to="/">Poke' Times</Link>
        <ul className="right">
          {/* NavLink adds the class 'active' if that is the page that is currently at in the url, important for css applying */}
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          <li><NavLink to='/contact'>Contact</NavLink></li>
        </ul>
      </div>
    </nav> 
  )
}

// the withRouter HOF is needed to add 'history' to the props, otherwise it is only added to the props, if the component was passed in to the <Route ... /> tag in App component
export default withRouter(Navbar)