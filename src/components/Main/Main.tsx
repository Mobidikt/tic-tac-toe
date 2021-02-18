import React, { useState } from 'react'


function Main(props:any) {
    const [computer, setComputer] = useState<boolean>(false);
    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')
    // return (
    //     {context => {
    //       const value = context.cells[props.index];
    //       const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDDER;
    //       const isDoneClass = icon !== ICON_PLACE_HOLDDER ? 'done' : '';
  
          return (<>
              <p>Ход </p>
              <div>
                Ирок 1
              </div>
              {computer?null :<div>Ирок 2</div>}
          </>)
        // }}
  }

  export default Main