import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Surface from '../../components/surface.js';
import EnglishFlag from '../../assets/englishFlag.png';
import FrenchFlag from '../../assets/frenchFlag.png';
import './grids.css';

//defines double flag grid style and props
 const DoubleFlagsGrid = (props) => {
  return (
    <div>
      {/*grid*/}
      <Grid container spacing={3}>
        {/*grid item*/}
        <Grid item xs={6}>
          {/*paper surface*/}
          <Surface elevation={10} className='surface' onClick={() => {props.updateLanguage('english')}}>
            {/*logo image*/}
            <img
              src={EnglishFlag}
              alt='English Flag'
            />
            {/*flag name*/}
            <p>{props.lang1}</p>
          </Surface>
        </Grid>
        {/*grid item*/}
        <Grid item xs={6}>
          {/*paper surface*/}
          <Surface elevation={10} className='surface' onClick={() => {props.updateLanguage('french')}}>
            {/*logo image*/}
            <img
              src={FrenchFlag}
              alt='French Flag'
            />
            {/*flag name*/}
            <p>{props.lang2}</p>
          </Surface>
        </Grid>
      </Grid>
    </div>
  );
}
export default DoubleFlagsGrid;

DoubleFlagsGrid.propTypes = {
  updateLanguage: PropTypes.func,
  lang1: PropTypes.string,
  lang2: PropTypes.string,
};
