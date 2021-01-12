import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Logo from '../assets/logo.png';

//theme used by topbar component
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6347'
    },
    secondary: {
      main: '#FFFFFF'
    },
  },
});

//defines topbar style and props
const TopBar = (props) => {
 return (
   <div style={{width: props.width, position: 'absolute', top: 0}}>
    {/*theme provider*/}
     <MuiThemeProvider theme={theme}>
      {/*app bar*/}
       <AppBar color='primary' position='static'>
        {/*tool bar*/}
         <Toolbar>
          {/*return icon button*/}
           <IconButton edge='start' aria-label='menu' onClick={props.returnToPreviousPage}>
            {/*arrow back icon */}
             <ArrowBackIcon style={{color: 'white'}}/>
           </IconButton>
           {/*left text wrapper*/}
           <div style={{display: 'flex', flexDirection: 'column', marginLeft: '1em'}}>
             {/*return text*/}
             <Typography variant='h6' color='secondary'>{props.title}</Typography>
             {/*page to return text*/}
             <span style={{color: 'Gainsboro', marginTop: '-0.3em'}}>{props.subtitle}</span>
           </div>
            {/*right image logo*/}
            <img
              src={Logo}
              alt='Logo'
              className='logo'
              style={{width: '9%', position: 'absolute', right: 50}}
            />
         </Toolbar>
       </AppBar>
      </MuiThemeProvider>
   </div>
 );
}
export default TopBar;

TopBar.propTypes = {
  returnToPreviousPage: PropTypes.func,
  width: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
