import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Surface from '../../components/surface.js';
import Button1 from '../../assets/icons/button1.png';
import Button2 from '../../assets/icons/button2.png';
import Button3 from '../../assets/icons/button3.png';
import Button4 from '../../assets/icons/button4.png';
import Button5 from '../../assets/icons/button5.png';
import SettingsButton from '../../assets/icons/settings.png';
import './grids.css';

//defines homegrid style and props
 const HomeGrid = (props) => {
  return (
    <div>
      <div>
        {/*grid line 1*/}
        <Grid container spacing={3}>
          {/*grid item 1*/}
          <Grid item xs={4}>
            {/*paper surface*/}
            <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button1')}}>
              {/*logo image*/}
              <img
                src={Button1}
                alt='Button 1'
              />
              {/*button name*/}
              <p>{props.button1}</p>
            </Surface>
          </Grid>
          {/*grid item 2*/}
          <Grid item xs={4}>
            {/*paper surface*/}
            <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button2')}}>
              {/*logo image*/}
              <img
                src={Button2}
                alt='Button 2'
              />
              {/*button name*/}
              <p>{props.button2}</p>
            </Surface>
          </Grid>
          {/*grid item 3*/}
          <Grid item xs={4}>
            {/*paper surface*/}
            <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button3')}}>
              {/*logo image*/}
              <img
                src={Button3}
                alt='Button 3'
              />
              {/*button name*/}
              <p>{props.button3}</p>
            </Surface>
          </Grid>
        </Grid>
      </div>
      <div style={{marginTop: '-3em'}}>
        {/*grid line 2*/}
        <Grid container spacing={3}>
          {/*grid item 4*/}
          <Grid item xs={4}>
            {/*paper surface*/}
            <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button4')}}>
              {/*logo image*/}
              <img
                src={Button4}
                alt='Button 4'
              />
              {/*button name*/}
              <p>{props.button4}</p>
            </Surface>
          </Grid>
          {/*grid item 5*/}
          <Grid item xs={4}>
            {/*paper surface*/}
            <Surface elevation={10} className='surface' onClick={() => {props.handleClick('button5')}}>
              {/*logo image*/}
              <img
                src={Button5}
                alt='Button 5'
              />
              {/*button name*/}
              <p>{props.button5}</p>
            </Surface>
          </Grid>
          {/*grid item 6*/}
          <Grid item xs={4}>
            {/*paper surface*/}
            <Surface elevation={10} className='surface' onClick={() => {props.handleClick('settings')}}>
              {/*logo image*/}
              <img
                src={SettingsButton}
                alt='Settings'
              />
              {/*button name*/}
              <p>{props.button6}</p>
            </Surface>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default HomeGrid;

HomeGrid.propTypes = {
  handleClick: PropTypes.func,
  button1: PropTypes.string,
  button2: PropTypes.string,
  button3: PropTypes.string,
  button4: PropTypes.string,
  button5: PropTypes.string,
  button6: PropTypes.string,
};
