import React, { Component } from 'react';
import { AppContext } from '../../context/AppContext';
import './Popup.css';

class InfoTooltip extends Component {
  constructor(props) {
    super(props);
    this.open = false;
  }
  componentDidUpdate() {
    if (this.context.openPopup) {
      this.open = 'popup_opened';
    } else {
      this.open = '';
    }
  }
  render() {
    if (this.context.openPopup) {
      this.open = 'popup_opened';
    } else {
      this.open = '';
    }
    return (
      <div className={`popup ${this.open}`}>
        <div className={`popup__container popup__container_info`}>
          <h3 className='popup__title'>{this.context.textPopup}</h3>
          <button
            type='button'
            className='popup__close'
            onClick={() => {
              this.context.openPopup = false;
              this.open = false;
            }}
          />
        </div>
      </div>
    );
  }
}
InfoTooltip.contextType = AppContext;
export default InfoTooltip;
