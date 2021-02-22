import { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import { GAME_TYPES } from '../../common';

const GameType = (props) => {
  const { value, name } = props;

  return (
    <AppContext.Consumer>
      {(context) => (
        <p onClick={() => context.changeType(value)} className='game-type'>
          {name}
        </p>
      )}
    </AppContext.Consumer>
  );
};

function ToggleButtonExample() {
  const stay = JSON.parse(localStorage.getItem('stay'));
  const [radioValue, setRadioValue] = useState(String(1 + stay.gameType));
  const radios = [
    { name: '2 Players', value: '1', type: GAME_TYPES.TWO_PLAYERS },
    {
      name: 'Play with computer',
      value: '2',
      type: GAME_TYPES.VERSUS_COMPUTER,
    },
  ];

  return (
    <ButtonGroup toggle>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          type='radio'
          variant='primary'
          name='radio'
          className='btn_radio'
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          <GameType value={radio.type} name={radio.name} />
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

ToggleButtonExample.contextType = ToggleButtonExample;

export default ToggleButtonExample;
