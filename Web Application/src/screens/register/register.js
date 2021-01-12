import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Login from '../login/login.js'
import Lottie from 'react-lottie';
import * as loader from '../../assets/animations/loaderSpin.json';
import Container from '@material-ui/core/Container';
import AppBar from '../../components/appBar.js';
import Input from '../../components/input.js';
import WhiteOutlinedButton from '../../components/buttons/whiteOutlinedButton.js';
import CheckBox from '../../components/checkbox.js';
import Alert from '../../components/alert.js';
import SimpleDialog from '../../components/dialogs/simpleDialog.js';
import * as TextHandler from '../../services/languagesHandler.js';
import * as Services from '../../services/apiServices.js';
import './register.css';

//option used for spinning loader (lottie)
const lottieSpinnerOption = {
  loop: true,
  autoplay: true,
  animationData: loader.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default class Register extends React.Component {
  constructor (props) {
     super(props);
     this.state = {
       appBarWidth: 0,
       termsTextWidth: 0,
       email: '',
       password: '',
       userName: '',
       passwordConfirmation: '',
       selectedLanguage: '',
       loaderVisible: false,
       snackbarVisible: false,
       snackbarMessage: '',
       snackbarSeverity: '',
       alertDialogVisible: false,
       alertDialogTitle: '',
       alertDialogContent: '',
       alertDialogButton1: '',
       alertDialogButton2: '',
       checkboxState: false,
     };
     this._containerRef = React.createRef();
     this._handleValidateClick = this._handleValidateClick.bind(this);
     this._updateDimensions = this._updateDimensions.bind(this);
     this._returnToPreviousPage = this._returnToPreviousPage.bind(this);
     this._handleCheckboxState = this._handleCheckboxState.bind(this);
     this._handleAlertDialogState = this._handleAlertDialogState.bind(this);
     this._validateEmail = this._validateEmail.bind(this);
     this._resetSnackbarState = this._resetSnackbarState.bind(this);
  }

  //function called when component is created
  componentDidMount () {
    this.setState({selectedLanguage: this.props.selectedLanguage});
    //update appBar width
    this._updateDimensions();
    //create window resize listener
    window.addEventListener('resize', this._updateDimensions);
  }

  //function called when component is removed
  componentWillUnmount() {
    //remove window resize listener
    window.removeEventListener('resize', this._updateDimensions);
  }

  //function used to update email state from textInput
  _handleEmailInputChange = e => {
    this.setState({email: e.target.value});
  }

  //function used to update password state from textInput
  _handlePasswordInputChange = e => {
    this.setState({password: e.target.value});
  }

  //function used to update email confirstate from textInput
  _handlePasswordConfirmationInputChange = e => {
    this.setState({passwordConfirmation: e.target.value});
  }

  //function used to update password state from textInput
  _handleUserNameInputChange = e => {
    this.setState({userName: e.target.value});
  }

  //function used to handle button click
  async _handleValidateClick() {
    //check user input
    const isFieldsOk = this._checkForValidFields();
    //user input ok
    if (isFieldsOk) {
      //defines user data constant
      const data = {
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
        emailConfirmed: false
      }
      //display spinning loader
      this.setState({loaderVisible: true});
      //try to register user
      const ret = await Services.registerUser(data);
      //user registration ok
      if (ret) {
        //defines user data constant
        const data = {
          email: this.state.email,
          language: this.state.selectedLanguage
        };
        //try to send confirm email link
        const sendConfirmEmailOk = await Services.confirmEmail(data);
        //send confirmation email link ok
        if (sendConfirmEmailOk) {
          const tmp = TextHandler.getRegisterText(1, this.state.selectedLanguage);
          //set snackbar sucess message
          this.setState({snackbarMessage: tmp});
          //set snackbar error severity
          this.setState({snackbarSeverity: 'success'});
          //display snackbar message
          this.setState({snackbarVisible: true});
          //hide spinning loader
          this.setState({loaderVisible: false});
          return;
        }
        //send confirmation email link ko
        else {
          const tmp = TextHandler.getRegisterText(2, this.state.selectedLanguage);
          //set snackbar sucess message
          this.setState({snackbarMessage: tmp});
          //set snackbar error severity
          this.setState({snackbarSeverity: 'error'});
          //display snackbar message
          this.setState({snackbarVisible: true});
          //hide spinning loader
          this.setState({loaderVisible: false});
          return;
        }
      }
      //user registration ko
      else {
        const tmp = TextHandler.getRegisterText(3, this.state.selectedLanguage);
        //set snackbar error message
        this.setState({snackbarMessage: tmp});
        //set snackbar error severity
        this.setState({snackbarSeverity: 'error'});
        //display snackbar message
        this.setState({snackbarVisible: true});
        //hide spinning loader
        this.setState({loaderVisible: false});
      }
    }
  }

  //function used to test password strongness
  _isPasswordStrongEnough = () => {
    //check if password is at least 8 chars long
    const password = this.state.password;
    if (password.length  <= 7) {
      return false;
    }
    //check if password has at least one special char
    let regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (regex.test(password) === false) {
      return false;
    }
    //check if password has at least 1 number
    regex = /([0-9].*[a-z])|([a-z].*[0-9])/;
    if (regex.test(password) === false) {
      return false;
    }
    return true;
  }

  //function used to validate user email
  _validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //function used to check text input fields before register
  _checkForValidFields() {
    //check for empty fields
    if (this.state.email === '' || this.state.password === '', this.state.userName === '' || this.state.passwordConfirmation === '')  {
      const tmp = TextHandler.getRegisterText(4, this.state.selectedLanguage);
      //set snackbar error message
      this.setState({snackbarMessage: tmp});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      return false;
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      const tmp = TextHandler.getRegisterText(5, this.state.selectedLanguage);
      //set snackbar error message
      this.setState({snackbarMessage: tmp});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      return false;
    }
    //check email format
    if (this._validateEmail(this.state.email) === false) {
      const tmp = TextHandler.getRegisterText(6, this.state.selectedLanguage);
      //set snackbar error message
      this.setState({snackbarMessage: tmp});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      return false;
    }
    //check for checkbox state
    if (this.state.checkboxState === false) {
      const tmp = TextHandler.getRegisterText(7, this.state.selectedLanguage);
      //set snackbar error message
      this.setState({snackbarMessage: tmp});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      return false;
    }
    //check password strongness
    if (this._isPasswordStrongEnough() === false) {
      const tmp = TextHandler.getRegisterText(8, this.state.selectedLanguage);
      //set snackbar error message
      this.setState({snackbarMessage: tmp});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      return false;
    }
    return true;
  }

  //function used for update the dimentions of app bar and terms and conditions text width
  _updateDimensions() {
    //get the container width
    let width = this._containerRef.current.offsetWidth;
    //set the app bar width
    this.setState({appBarWidth: width});
    //update witdh for terms and conditions text
    width /= 1.35;
    //set the terms and conditions text width
    this.setState({termsTextWidth: width});
  }

  //function used to return to the login page
  _returnToPreviousPage() {
    ReactDOM.render(<Login {...this.state}/>, document.getElementById('root'));
  }

  //function used to update terms and conditions popup states
  _handleStateForTermsPopop(tmp) {
    //update popup title
    tmp = TextHandler.getRegisterText(9, this.state.selectedLanguage);
    this.setState({alertDialogTitle: tmp});
    //update popup content
    tmp = TextHandler.getRegisterText(10, this.state.selectedLanguage);
    this.setState({alertDialogContent: tmp});
    //update popup button 1
    tmp = TextHandler.getRegisterText(11, this.state.selectedLanguage);
    this.setState({alertDialogButton1: tmp});
    //update popup button 2
    tmp = TextHandler.getRegisterText(12, this.state.selectedLanguage);
    this.setState({alertDialogButton2: tmp});
  }

  //function hused to hangle checkbox state
  _handleCheckboxState() {
    //check if popup must be displayed
    let tmp = this.state.checkboxState;
    if (!tmp) {
      //update states for terms and conditions popup
      this._handleStateForTermsPopop(tmp);
      //display the terms and conditions popup
      this.setState({alertDialogVisible: true});
    }
    else {
      //uncheck the checkbox
      this.setState({checkboxState: false});
    }
  }

  //function used to handle the display of terms and conditions popup
  _handleAlertDialogState(accepted) {
    //get the current state of the terms and conditions popup
    const tmp = this.state.alertDialogVisible;
    //display / hide the terms and conditions popup
    this.setState({alertDialogVisible: !tmp});
    if (accepted) {
      //validate the checkbox
      this.setState({checkboxState: true});
    }
  }

  //function used to reset the snackbar state
  _resetSnackbarState(goToLogin) {
    this.setState({snackbarMessage: ''});
    this.setState({snackbarVisible: false});
    if (goToLogin === true) {
      this._returnToPreviousPage();
    }
  }

  render() {
    return (
      /*Fragment component*/
      <React.Fragment>
        {/*Container with image background*/}
        <Container
          ref={this._containerRef}
          maxWidth='sm'
          className='container'
          style={{backgroundImage: 'linear-gradient(#ff6600, #f94000)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
        >
          {/*Page app bar*/}
          <AppBar
            width={this.state.appBarWidth}
            title={TextHandler.getRegisterText(13, this.state.selectedLanguage)}
            subtitle={TextHandler.getRegisterText(14, this.state.selectedLanguage)}
            returnToPreviousPage={this._returnToPreviousPage}
          />
          {/*page Title*/}
          <h1 id='pageTitle'>{TextHandler.getRegisterText(15, this.state.selectedLanguage)}</h1>
          {/*email textInput*/}
          <Input
            label='Email'
            value={this.state.email}
            onChange={this._handleEmailInputChange}
            className='input'
            style={{marginTop: '3.5em'}}
          />
          {/*user name textInput*/}
          <Input
            label={TextHandler.getRegisterText(16, this.state.selectedLanguage)}
            value={this.state.userName}
            onChange={this._handleUserNameInputChange}
            className='input'
            style={{marginTop: '3.5em'}}
          />
          {/*password textInput*/}
          <Input
            label={TextHandler.getRegisterText(17, this.state.selectedLanguage)}
            type='password'
            value={this.state.password}
            onChange={this._handlePasswordInputChange}
            className='input'
            style={{marginTop: '3.5em'}}
          />
          {/*password confirmation textInput*/}
          <Input
            label={TextHandler.getRegisterText(18, this.state.selectedLanguage)}
            type='password'
            value={this.state.passwordConfirmation}
            onChange={this._handlePasswordConfirmationInputChange}
            className='input'
            style={{marginTop: '3.5em'}}
          />
          {/*checkbox terms and conditions*/}
          <div style={{display: 'flex', flexDirection: 'row', marginTop: '2.5em'}}>
            {/*Checkbox*/}
            <CheckBox handleCheckboxState={this._handleCheckboxState} checked={this.state.checkboxState}/>
            {/*terms and conditions text*/}
            <p style={{width: this.state.termsTextWidth, marginLeft: '1em', color: 'white'}}>{TextHandler.getRegisterText(19, this.state.selectedLanguage)}</p>
          </div>
          {/*login button*/}
          <WhiteOutlinedButton
            variant='outlined'
            className='input'
            onClick={() => {this._handleValidateClick()}}
            style={{marginTop: '3.5em'}}
          >
          {TextHandler.getRegisterText(20, this.state.selectedLanguage)}
          </WhiteOutlinedButton>
          {/*spinning loader*/}
          {
            this.state.loaderVisible
            ? <div id='loader'>
                <Lottie options={lottieSpinnerOption} isClickToPauseDisabled={true} />
              </div>
            : null
          }
          {/*snackbar messages*/}
          {
            this.state.snackbarVisible
            ? <Alert
                handleClose={this._resetSnackbarState}
                message={this.state.snackbarMessage}
                severity={this.state.snackbarSeverity}
                maxWidth={this._containerRef.current.offsetWidth}
                goToLogin={this.state.snackbarSeverity === 'success' ? true : false}
              />
            : null
          }
          {/*alert dialog popup*/}
          {
            this.state.alertDialogVisible
            ? <SimpleDialog
                handleClose={this._handleAlertDialogState}
                title={this.state.alertDialogTitle}
                content={this.state.alertDialogContent}
                button1={this.state.alertDialogButton1}
                button2={this.state.alertDialogButton2}
              />
            : null
          }
        </Container>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  selectedLanguage: PropTypes.string,
};
