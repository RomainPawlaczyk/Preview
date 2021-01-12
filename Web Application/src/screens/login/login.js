import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import * as loader from '../../assets/animations/loaderSpin.json';
import Register from '../register/register.js';
import Container from '@material-ui/core/Container';
import Logo from '../../assets/logo.png';
import Input from '../../components/input.js';
import WhiteOutlinedButton from '../../components/buttons/whiteOutlinedButton.js';
import WhiteButtonLink from '../../components/buttons/whiteButtonLink.js';
import BottomButton from '../../components/buttons/bottomButton.js';
import Alert from '../../components/alert.js';
import TextfieldDialog from '../../components/dialogs/textfieldDialog.js';
import MultipleContentDialog from '../../components/dialogs/multipleContentDialog.js';
import * as TextHandler from '../../services/languagesHandler.js';
import * as Services from '../../services/apiServices.js';
import * as Storage from '../../services/serviceStorage.js';
import Home from '../home/home.js';
import { Icon } from '@iconify/react';
import accountPlus from '@iconify/icons-mdi/account-plus';
import './login.css';

//option used for spinning loader (lottie)
const lottieSpinnerOption = {
  loop: true,
  autoplay: true,
  animationData: loader.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default class Login extends React.Component {
  constructor (props) {
     super(props);
     this.state = {
       email: '',
       password: '',
       firstConnection: false,
       bottomButtonWidth: 0,
       selectedLanguage: '',
       loaderVisible: false,
       snackbarVisible: false,
       snackbarMessage: 'ERROR MSG',
       snackbarSeverity: 'warning',
       alertDialogVisible: false,
       emailNotValidatedDialogVisible: false,
       alertDialogTitle: '',
       alertDialogContent: '',
       alertDialogContent2: '',
       alertDialogContent3: '',
       alertDialogButton1: '',
       alertDialogButton2: '',
       alertDialogTextfieldValue: '',
       isRegisterButtonVisible: true
     };
     this._containerRef = React.createRef();
     this._handleButtonClick = this._handleButtonClick.bind(this);
     this._updateBottomButtonDimensions = this._updateBottomButtonDimensions.bind(this);
     this._resetSnackbarState = this._resetSnackbarState.bind(this);
     this._handleAlertDialogState = this._handleAlertDialogState.bind(this);
     this._handleEmailNotValidatedDialogState = this._handleEmailNotValidatedDialogState.bind(this);
     this._validateEmail = this._validateEmail.bind(this);
  }

  //function called when component is created
  componentDidMount () {
    this.setState({selectedLanguage: this.props.selectedLanguage});
    //update register button width
    this._updateBottomButtonDimensions();
    //create window resize listener
    window.addEventListener('resize', this._updateBottomButtonDimensions);
    //create scroll listener
    window.addEventListener('scroll', this._handleScroll);
  }

  //function called when component is removed
  componentWillUnmount() {
    //remove window resize listener
    window.removeEventListener('resize', this._updateBottomButtonDimensions);
    //remove scroll addEventListener
    window.removeEventListener('scroll', this._handleScroll);
  }

  //function used to update register button width based on container width
  _updateBottomButtonDimensions() {
    this.setState({bottomButtonWidth: this._containerRef.current.offsetWidth});
  }

  //function used to update email state from textInput
  _handleEmailInputChange = e => {
    this.setState({email: e.target.value});
  }

  //function used to update password state from textInput
  _handlePasswordInputChange = e => {
    this.setState({password: e.target.value});
  }

  //function used to update password state from textInput alert dialog
  _handleAlertDialogTextfieldChange = e => {
    this.setState({alertDialogTextfieldValue: e.target.value});
  }

  //function used to hide register button if input is focused
  _hideRegisterButton = () => {
    this.setState({isRegisterButtonVisible: false});
  }

  //function used to display register button if input is not focused
  _displayRegisterButton = () => {
    this.setState({isRegisterButtonVisible: true});
  }

  //function used to update forgot password popup states
  _handleStateForForgotPasswordPopup() {
    //get alert dialog title text
    let tmp = TextHandler.getLoginText(1, this.state.selectedLanguage);
    //set state alert dialog title
    this.setState({alertDialogTitle: tmp});
    //get alert dialog content text
    tmp = TextHandler.getLoginText(2, this.state.selectedLanguage);
    //set state alert dialog content
    this.setState({alertDialogContent: tmp});
    //get alert dialog button 1 text
    tmp = TextHandler.getLoginText(3, this.state.selectedLanguage);
    //set state alert dialog button 1
    this.setState({alertDialogButton1: tmp});
    //get alert dialog button 2 text
    tmp = TextHandler.getLoginText(4, this.state.selectedLanguage);
    //set state alert dialog button 2
    this.setState({alertDialogButton2: tmp});
  }

  //function used to update email not validated popup states
  _handleStateForEmailNotValidatedPopup() {
    //update popup title
    let tmp = TextHandler.getLoginText(5, this.state.selectedLanguage);
    this.setState({alertDialogTitle: tmp});
    //update popup content 1
    tmp = TextHandler.getLoginText(6, this.state.selectedLanguage);
    this.setState({alertDialogContent: tmp});
    //update popup content 2
    tmp = TextHandler.getLoginText(7, this.state.selectedLanguage);
    this.setState({alertDialogContent2: tmp});
    //update popup content 3
    tmp = TextHandler.getLoginText(8, this.state.selectedLanguage);
    this.setState({alertDialogContent3: tmp});
    //update popup button 1
    tmp = TextHandler.getLoginText(9, this.state.selectedLanguage);
    this.setState({alertDialogButton1: tmp});
    //update popup button 2
    tmp = TextHandler.getLoginText(10, this.state.selectedLanguage);
    this.setState({alertDialogButton2: tmp});
  }

  //function used to handle button click
  _handleButtonClick(button) {
    //login button clicked
    if (button === 'login') {
      this._tryToLogin();
    }
    //forgot password button clicked
    else if (button === 'forgotPassword') {
      //update states for forgot password popup
      this._handleStateForForgotPasswordPopup();
      //display forgot password popup
      this.setState({alertDialogVisible: true});
    }
    //register button clicked
    else if (button === 'register') {
      //display register page
      ReactDOM.render(<Register {...this.state}/>, document.getElementById('root'));
    }
  }

  //function used to validate user email
  _validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //function used to check text input fields before login
  _checkForValidFields() {
    //check for empty fields
    if (this.state.email === '' || this.state.password === '') {
      //set snackbar success message
      this.setState({snackbarMessage: TextHandler.getLoginText(11, this.state.selectedLanguage)});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      return false;
    }
    //check email format
    if (this._validateEmail(this.state.email) === false) {
      //set snackbar success message
      this.setState({snackbarMessage: TextHandler.getLoginText(12, this.state.selectedLanguage)});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      return false;
    }
    return true;
  }

  //function used to reset and hide snackbar
  _resetSnackbarState() {
    //reset snackbar message
    this.setState({snackbarMessage: ''});
    //hide snackbar
    this.setState({snackbarVisible: false});
  }

  //function used to handle the email not confirmed popup
  async _handleEmailNotValidatedDialogState(sendNewEmail) {
    //send new email button clicked
    if (sendNewEmail) {
      //defines user constant data
      const data = {
        email: this.state.email,
        language: this.state.selectedLanguage
      }
      //display spinning loader
      this.setState({loaderVisible: true});
      //try to send confirmail email
      const ret = await Services.confirmEmail(data);
      //email send ok
      if (ret) {
        //set snackbar success message
        this.setState({snackbarMessage: TextHandler.getLoginText(13, this.state.selectedLanguage)});
        //set snackbar error severity
        this.setState({snackbarSeverity: 'success'});
        //display snackbar message
        this.setState({snackbarVisible: true});
      }
      //email send KO
      else {
        //set snackbar success message
        this.setState({snackbarMessage: TextHandler.getLoginText(14, this.state.selectedLanguage)});
        //set snackbar error severity
        this.setState({snackbarSeverity: 'error'});
        //display snackbar message
        this.setState({snackbarVisible: true});
      }
    }
    //display spinning loader
    this.setState({loaderVisible: false});
    //hide email not validated popup
    this.setState({emailNotValidatedDialogVisible: false});
  }

  //function used to change the alert dialog visible state
  async _handleAlertDialogState(accepted) {
    if (accepted) {
      //check popup email textfield value
      let ret = this._validateEmail(this.state.alertDialogTextfieldValue);
      //email textfield error
      if (ret === false) {
        //set snackbar error message
        this.setState({snackbarMessage: TextHandler.getLoginText(15, this.state.selectedLanguage)});
        //set snackbar error severity
        this.setState({snackbarSeverity: 'error'});
        //display snackbar message
        this.setState({snackbarVisible: true});
        //hide alert dialog
        this.setState({alertDialogVisible: false});
        return;
      }
      //activate spinning loader
      this.setState({loaderVisible: true});
      //defines object with texfield email
      const data = {
        email: this.state.alertDialogTextfieldValue,
        language: this.state.selectedLanguage
      }
      //try to send password recovery email
      ret = await Services.resetPassword(data);
      //sending email success
      if (ret === true) {
        //set snackbar success message
        this.setState({snackbarMessage: TextHandler.getLoginText(16, this.state.selectedLanguage)});
        //set snackbar error severity
        this.setState({snackbarSeverity: 'success'});
        //display snackbar message
        this.setState({snackbarVisible: true});
        //hide alert dialog
        this.setState({alertDialogVisible: false});
      }
      //sending email failed
      else {
        //set snackbar success message
        this.setState({snackbarMessage: 'Recovery password email send with failed'});
        //set snackbar error severity
        this.setState({snackbarSeverity: 'error'});
        //display snackbar message
        this.setState({snackbarVisible: true});
        //hide alert dialog
        this.setState({alertDialogVisible: false});
      }
    }
    //reset alert password texfield
    this.setState({alertDialogTextfieldValue: ''});
    //hide spinning loader
    this.setState({loaderVisible: false});
    //hide alert dialog
    this.setState({alertDialogVisible: false});
  }

  //function used to log user into service
  async _tryToLogin() {
    //check textinput fields
    let ret = this._checkForValidFields();
    if (ret === false) {
      return;
    }
    //defines user credentials constant
    const credentials = {
      email: this.state.email,
      password: this.state.password
    }
    //display spinning loader
    this.setState({loaderVisible: true});
    //try to log user
    ret = await Services.userLogin(credentials);
    //login failed credentails ko
    if (ret === 'credentialsKo') {
      //set snackbar error message
      this.setState({snackbarMessage: TextHandler.getLoginText(17, this.state.selectedLanguage)});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      //hide spinning loader
      this.setState({loaderVisible: false});
      return;
    }
    //login failed server error
    else if (ret === 'error') {
      //set snackbar error message
      this.setState({snackbarMessage: TextHandler.getLoginText(18, this.state.selectedLanguage)});
      //set snackbar error severity
      this.setState({snackbarSeverity: 'error'});
      //display snackbar message
      this.setState({snackbarVisible: true});
      //hide spinning loader
      this.setState({loaderVisible: false});
      return;
    }
    //login success
    else {
      //handle email not confirmed case
      if (ret.emailConfirmed === false) {
        //handle here popup validation link
        this._handleStateForEmailNotValidatedPopup();
        //hide spinning loader
        this.setState({loaderVisible: false});
        //display email not validated popup
        this.setState({emailNotValidatedDialogVisible: true});
        return;
      }
      //defines user information constant
      let data = {
        email: this.state.email,
        password: this.state.password,
        sessionToken: ret.token,
        userId: ret.userId
      }
      //store user information into persistent storage
      Storage.storeUserData(data);
      //check if it's user first connection
      if (ret.firstConnection === true) {
        //set first connection state to true
        this.setState({firstConnection: true});
        //update data for the first connection validation
        data = {userId: ret.userId};
        //validate user first connection
        await Services.validateFirstConnection(data);
      }
      //hide spinning loader
      this.setState({loaderVisible: false});
      //navigate to home page with first connection variable set to true
      ReactDOM.render(<Home {...this.state}/>, document.getElementById('root'));
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
          style={{backgroundImage: 'linear-gradient(#ff6600, #f94000)',  height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
        >
          {/*logo image*/}
          <img
            src={Logo}
            alt='Logo'
            className='logo'
            style={{marginBottom: '5%'}}
          />
          {/*email textInput*/}
          <Input
            label='Email'
            value={this.state.email}
            onChange={this._handleEmailInputChange}
            className='input'
            onBlur={this._displayRegisterButton}
            onFocus={this._hideRegisterButton}
            style={{marginTop: '10%'}}
          />
          {/*password textInput*/}
          <Input
            label={TextHandler.getLoginText(19, this.state.selectedLanguage)}
            type='password'
            value={this.state.password}
            onChange={this._handlePasswordInputChange}
            className='input'
            onBlur={this._displayRegisterButton}
            onFocus={this._hideRegisterButton}
            style={{marginTop: '10%'}}
          />
          {/*login button*/}
          <WhiteOutlinedButton
            variant='outlined'
            className='input'
            onClick={() => {this._handleButtonClick('login')}}
            style={{marginTop: '17%'}}
          >
          {TextHandler.getLoginText(20, this.state.selectedLanguage)}
          </WhiteOutlinedButton>
          {/*forgot password button*/}
          <WhiteButtonLink
            variant='outlined'
            className='input'
            onClick={() => {this._handleButtonClick('forgotPassword')}}
            style={{marginTop: '10%'}}
          >
          {TextHandler.getLoginText(21, this.state.selectedLanguage)}
          </WhiteButtonLink>
          {/*register button*/}
          <BottomButton
            startIcon={<Icon icon={accountPlus} />}
            className='bottomButton'
            onClick={() => {this._handleButtonClick('register')}}
            style={this.state.isRegisterButtonVisible ? {position: 'fixed', bottom: '0', width: this.state.bottomButtonWidth} : {display: 'none'}}
          >
          {TextHandler.getLoginText(22, this.state.selectedLanguage)}
          </BottomButton>
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
              />
            : null
          }
          {/*alert textfield dialog popup used for forgot password*/}
          {
            this.state.alertDialogVisible
            ? <TextfieldDialog
                handleClose={this._handleAlertDialogState}
                title={this.state.alertDialogTitle}
                content={this.state.alertDialogContent}
                button1={this.state.alertDialogButton1}
                button2={this.state.alertDialogButton2}
                textfieldValue={this.state.alertDialogTextfieldValue}
                textfieldChange={this._handleAlertDialogTextfieldChange}
              />
            : null
          }
          {/*alert multiple content dialog popup used for email not validated*/}
          {
            this.state.emailNotValidatedDialogVisible
            ? <MultipleContentDialog
                handleClose={this._handleEmailNotValidatedDialogState}
                title={this.state.alertDialogTitle}
                content={this.state.alertDialogContent}
                content2={this.state.alertDialogContent2}
                content3={this.state.alertDialogContent3}
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

Login.propTypes = {
  selectedLanguage: PropTypes.string,
  sessionToken: PropTypes.string,
};
