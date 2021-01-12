import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

//theme used by radio button
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
  },
});

//defines radio button style and props
const LanguageRadioButton = (props) => {

  //handling radio button states
  const handleRadioButtonState = () => {
    if (props.buttonName === 'english') {
      if (props.selectedLanguage === 'english') {
        return true;
      }
      else {
        return false;
      }
    }
    else if (props.buttonName === 'french') {
      if (props.selectedLanguage === 'french') {
        return true;
      }
      else {
        return false;
      }
    }
  }

  return (
    <div style={{marginTop: '1em'}}>
      {/*theme provider*/}
      <MuiThemeProvider theme={theme}>
        {/*radio button*/}
        <Radio
          color={'primary'}
          checked={handleRadioButtonState()}
          onClick={props.handleRadioButtonChange}
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'A' }}
        />
      </MuiThemeProvider>
    </div>
  );
}
export default LanguageRadioButton;

LanguageRadioButton.propTypes = {
  handleRadioButtonChange: PropTypes.func,
  selectedLanguage: PropTypes.string,
  buttonName: PropTypes.string,
};
