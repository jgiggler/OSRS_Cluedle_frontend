import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
  
  
  return (
    <nav className='NavBar'>
        
        <Link to="/" className='NavBarChild' onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/item" className='NavBarChild' onClick={() => setIsOpen(false)}>Items</Link>
        <Link to="/monster" className='NavBarChild' onClick={() => setIsOpen(false)}>Monsters</Link>
    </nav>
  );
}

export default Nav;
