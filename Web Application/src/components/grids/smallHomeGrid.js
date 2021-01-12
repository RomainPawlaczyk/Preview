import React from 'react';
import PropTypes from 'prop-types';
import Surface from '../../components/surface.js';
import Button1 from '../../assets/icons/button1.png';
import Button2 from '../../assets/icons/button2.png';
import Button3 from '../../assets/icons/button3.png';
import Button4 from '../../assets/icons/button4.png';
import Button5 from '../../assets/icons/button5.png';
import SettingsButton from '../../assets/icons/settings.png';
import './grids.css';

//defines homegrid style and props
 const SmallHomeGrid = (props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {/*grid line 1*/}
      <div style={{marginTop: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        {/*paper surface button 1*/}
        <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button1')}} style={{marginRight: '3%'}}>
          {/*logo image*/}
          <img
            src={Button1}
            alt='Button 1'
          />
          {/*button name*/}
          <p>{props.button1}</p>
        </Surface>
        {/*paper surface button 2*/}
        <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button2')}} style={{marginLeft: '3%'}}>
          {/*logo image*/}
          <img
            src={Button2}
            alt='Button 2'
          />
          {/*button name*/}
          <p>{props.button2}</p>
        </Surface>
      </div>
      {/*grid line 2*/}
      <div style={{marginTop: '-10%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {/*paper surface button 3*/}
        <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button3')}} style={{marginRight: '3%'}}>
          {/*logo image*/}
          <img
            src={Button3}
            alt='Button 3'
          />
          {/*button name*/}
          <p>{props.button3}</p>
        </Surface>

        {/*paper surface button 4*/}
        <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button4')}} style={{marginLeft: '3%'}}>
          {/*logo image*/}
          <img
            src={Button4}
            alt='Button 4'
          />
          {/*button name*/}
          <p>{props.button4}</p>
        </Surface>
      </div>
      {/*grid line 3*/}
      <div style={{marginTop: '-10%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {/*paper surface button 5*/}
        <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button5')}} style={{marginRight: '3%'}}>
          {/*logo image*/}
          <img
            src={Button5}
            alt='Button 5'
          />
          {/*button name*/}
          <p>{props.button5}</p>
        </Surface>

        {/*paper surface button 6*/}
        <Surface elevation={10} className='surface' onClick={() => {props.handleClick('settings')}} style={{marginLeft: '3%'}}>
          {/*logo image*/}
          <img
            src={SettingsButton}
            alt='Settings'
          />
          {/*button name*/}
          <p>{props.button6}</p>
        </Surface>
      </div>
    </div>
  );
}
export default SmallHomeGrid;

SmallHomeGrid.propTypes = {
  handleClick: PropTypes.func,
  button1: PropTypes.string,
  button2: PropTypes.string,
  button3: PropTypes.string,
  button4: PropTypes.string,
  button5: PropTypes.string,
  button6: PropTypes.string,
};
