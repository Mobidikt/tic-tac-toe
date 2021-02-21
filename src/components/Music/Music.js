import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Music.css';

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      url: 'http://streaming.tdiradio.com:8000/house.mp3',
    };
    this.audio = new Audio(this.state.url);
  }
  componentDidMount() {
    this.audio.addEventListener('ended', () => this.setState({ play: false }));
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', () =>
      this.setState({ play: false }),
    );
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  };
  lowVolumeSound = () => {
    if (this.audio.volume >= 0.2) this.audio.volume = this.audio.volume - 0.2;
    return;
  };
  upVolumeSound = () => {
    if (this.audio.volume <= 0.8) this.audio.volume = this.audio.volume + 0.2;
    return;
  };

  render() {
    return (
      <div>
        <Button
          variant='primary'
          className='sound__button sound__play'
          size='lg'
          active
          onClick={this.togglePlay}
        >
          Sound {this.state.play ? 'Pause' : 'Play'}
        </Button>{' '}
        <Button
          variant='primary'
          className='sound__button sound__down'
          size='lg'
          active
          onClick={this.lowVolumeSound}
        ></Button>{' '}
        <Button
          variant='primary'
          className='sound__button sound__up'
          size='lg'
          active
          onClick={this.upVolumeSound}
        ></Button>{' '}
      </div>
    );
  }
}

export default Music;
