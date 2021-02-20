import React from 'react';
import './Header.css'

function Header() {

  return (
    <header  className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <h1>Tic-tac-toe</h1>
      </div>
    </header>
  );
} 


export default Header;