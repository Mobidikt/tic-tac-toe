import React from 'react';
import './Footer.css'

function Fotter() {
  return (
    <footer  className='text-center text-lg-left '>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <span className='copuright'>
          &copy; {new Date().getFullYear()} Developed by:{' '}     
         <a href='https://github.com/Mobidikt' target='_blanck' rel='noreferrer'>
        Kirill Metsker
      </a>
          </span>
          <span> Сourse&nbsp;
      <a href='https://rs.school/' target='_blanck' rel='noreferrer'>
        RS&nbsp;School
      </a>
      </span>
      </div>
    </footer>
  );
}
export default Fotter;