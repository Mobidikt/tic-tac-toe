import React from 'react'
import './Cell.css'

const Cell = (props:any) => {
    // return (
    //     {context => {
    //       const value = context.cells[props.index];
    //       const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDDER;
    //       const isDoneClass = icon !== ICON_PLACE_HOLDDER ? 'done' : '';
  
          return (
            <button
              className={`cell`}
              onClick={props.onClick}>
            </button>
          )
        // }}
  }

  export default Cell