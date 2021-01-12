import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView, Text, TouchableHighlight, Image } from 'react-native';
import { Appbar, Button, Checkbox, Portal, Dialog, Paragraph, Snackbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import * as Services from '../services/services.js';
import * as Storage from '../services/serviceStorage.js';
import * as TextHandler from '../services/languagesHandler.js';
import AppBar from '../components/appbar/appbar.js';
import TextInput from '../components/textinputs/whiteTextinput.js';
import WhiteOutlinedButton from '../components/buttons/whiteOutlinedButton.js';
import SimpleContentDialog from '../components/dialogs/simpleContentDialog.js';
import TermsAndConditionsGrid from '../components/grids/termsAndConditionsGrid.js';
import SuccessSnackbar from '../components/snackbars/successSnackbar.js';
import ErrorSnackbar from '../components/snackbars/errorSnackbar.js';

export default class RegisterScreen extends Component {
  constructor (props) {
     super(props)
     this.state = {
       email: '',
       username: '',
       password: '',
       confirmation: '',
       checkboxValidated: false,
       termsPopupVisible: false,
       okSnackbarVisible: false,
       alertSnackbarVisible: false,
       loaderVisible: false,
       accoutCreationPopupVisible: false,
       selectedLanguage: 'english',
       message: ''
     };
  }

  //function called when component is created
  async componentDidMount() {
    //get selectedlanguage from the persistent storage
    const lang = await Storage.getUserSelectedLanguage('selectedLanguage');
    //set the selected language state
    this.setState({selectedLanguage: lang});
  }

  //function used to display the terms and conditions popup
  _showTermsPopup = () => this.setState({termsPopupVisible: true});

  //function used to hide the terms and conditions popup
  _hideTermsPopup = () => this.setState({termsPopupVisible: false});

  //function used to display the account popup
  _showAccountPopup = () => this.setState({accoutCreationPopupVisible: true});

  //function used to hide the account popup
  _hideAccountPopup = () => this.setState({accoutCreationPopupVisible: false});

  //function used to display the alert snackbar
  _showAlertSnackbar = () => this.setState({alertSnackbarVisible: true});

  //function used to hide the alert snackbar
  _hideAlertSnackbar = () => this.setState({alertSnackbarVisible: true});

  //function used to handle the email textfield change
  _handleEmailChange = (mail) => this.setState({email: mail});

  //function used to handle the password textfield change
  _handlePasswordChange = (password) => this.setState({password: password});

  //function used to handle the name textfield change
  _handleNameChange = (name) => this.setState({username: name});

  //function used to handle the password confirmation textfield change
  _handlePasswordConfirmationChange = (confirmation) => this.setState({confirmation: confirmation});

  //function used to handle the terms and conditions checkox onPress
  _handleCheckboxPress = () => {
    //the checkbox was validated before the onPress
    if (this.state.checkboxValidated === true) {
      //uncheck the checkox
      this.setState({checkboxValidated: false});
    }
    //the checkbox was NOT validated before the onPress
    else {
      //display the terms and conditions popup
      this._showTermsPopup();
    }
  }

  //function used to validate the checkbox and hide terms and conditions popup
  _handleTermsPopupDisplayAndValidate = () => {
    //validate checkbox
    this.setState({checkboxValidated: true});
    //hide terms and conditions popup
    this._hideTermsPopup();
  }

  //function used to get the snackbar messages
  _handleSnackbarMessages(type) {
    //success snackbar message
    if (type === 'success') {
      //account creation success
      if (this.state.message === 'accountCreationOk') {
        return TextHandler.getRegisterText(1, this.state.selectedLanguage);
      }
    }
    //error snackbar message
    else if (type === 'error') {
      //textfield empty
      if (this.state.message === 'fieldEmpty') {
        return TextHandler.getRegisterText(2, this.state.selectedLanguage);
      }
      //email format invalid
      else if (this.state.message === 'emailFormat') {
        return TextHandler.getRegisterText(3, this.state.selectedLanguage);
      }
      //password and password confirmation not the same
      else if (this.state.message === 'passwordConfirmation') {
        return TextHandler.getRegisterText(4, this.state.selectedLanguage);
      }
      //terms and conditions not validated
      else if (this.state.message === 'termsValidated') {
        return TextHandler.getRegisterText(5, this.state.selectedLanguage);
      }
      //return server error
      else if (this.state.message === 'returnServer') {
        return TextHandler.getRegisterText(6, this.state.selectedLanguage);
      }
      //email not confirmed
      else if (this.state.message === 'returnSendConfirmEmail') {
        return TextHandler.getRegisterText(7, this.state.selectedLanguage);
      }
      //password is not strong enough
      else if (this.state.message === 'passwordStrongnessKo') {
        return TextHandler.getRegisterText(8, this.state.selectedLanguage);
      }
    }
  }

  //function used to hide account creation success snackbar and go to login screen
  _handleOkSnackbarClose = () => {
    //hide snackbar
    this.setState({okSnackbarVisible: false});
    //return to login page
    this.props.navigation.goBack();
  }

  //function used to test password strongness
  _isPasswordStrongEnough = () => {
    //check if password is at least 8 chars long
    const password = this.state.password;
    if (password.length  <= 7) {
      return false;
    }
    //check if password has at least one special char
    var regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (regex.test(password) === false) {
      return false;
    }
    //check if password has at least 1 number
    regex = /([0-9].*[a-z])|([a-z].*[0-9])/;
    if (regex.test(password) === false) {
      return false;
    }
    //all tests OK
    return true;
  }

  _checkCredentialsForRegistration = async () => {
    //check user credentials
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //check empty fields
    if (this.state.email === '' || this.state.username === '' || this.state.password === '' || this.state.confirmation === '') {
      this.setState({alertSnackbarVisible: true});
      this.setState({message: 'fieldEmpty'});
    }
    //check email
    else if (emailReg.test(this.state.email) === false) {
      this.setState({alertSnackbarVisible: true});
      this.setState({message: 'emailFormat'});
    }
    //check if password and confirmation are the same
    else if (this.state.password !== this.state.confirmation) {
      this.setState({alertSnackbarVisible: true});
      this.setState({message: 'passwordConfirmation'});
    }
    //check if terms checkbox validated
    else if (this.state.checkboxValidated === false) {
      this.setState({alertSnackbarVisible: true});
      this.setState({message: 'termsValidated'});
    }
    else if (this._isPasswordStrongEnough() === false) {
      this.setState({alertSnackbarVisible: true});
      this.setState({message: 'passwordStrongnessKo'});
    }
    //Credentials ok, try to register user
    else {
      this.setState({loaderVisible: true});
      const credentials = {
        userName: this.state.username,
        language: this.state.selectedLanguage,
        email: this.state.email,
        selectedLanguage: this.state.selectedLanguage,
        emailConfirmed: false,
        password: this.state.password,
      };
      //register user
      const registerUser = await Services.registerUser(credentials);
      //register ko
      if (registerUser === false) {
        this.setState({alertSnackbarVisible: true});
        this.setState({message: 'returnServer'});
      }
      //register ok
      else {
        //set constant data for the confirmEmail route
        const data = {
          email: this.state.email,
          language: this.state.selectedLanguage
        };
        //send confirm email link
        const sendConfirmEmailOk = await Services.confirmEmail(data);
        //send confirmation email link ok
        if (sendConfirmEmailOk) {
          this.setState({okSnackbarVisible: true});
          this.setState({message: 'accountCreationOk'});
        }
        //send confirmation email link ko
        else {
          this.setState({alertSnackbarVisible: true});
          this.setState({message: 'returnSendConfirmEmail'});
        }
      }
      //display spinning loader
      this.setState({loaderVisible: false});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*App header*/}
        <AppBar
          goBack={() => {this.props.navigation.goBack()}}
          title={TextHandler.getRegisterText(9, this.state.selectedLanguage)}
          subtitle={TextHandler.getRegisterText(10, this.state.selectedLanguage)}
        />
        {/*ScrollView*/}
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/*Background image*/}
          <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../assets/backgrounds/orange.png')}
          >
            {/*Inner view*/}
            <View style={styles.innerContainer}>
              {/*Page title*/}
              <Text style={styles.title}>{TextHandler.getRegisterText(11, this.state.selectedLanguage)}</Text>
              {/*Email field*/}
              <TextInput
                label='Email'
                value={this.state.email}
                isSecured={false}
                handleChange={this._handleEmailChange}
              />
              {/*Username field*/}
              <TextInput
                label={TextHandler.getRegisterText(12, this.state.selectedLanguage)}
                value={this.state.username}
                isSecured={false}
                handleChange={this._handleNameChange}
              />
              {/*Password field*/}
              <TextInput
                label={TextHandler.getRegisterText(13, this.state.selectedLanguage)}
                value={this.state.password}
                isSecured={true}
                handleChange={this._handlePasswordChange}
              />
              {/*Password confirmation field*/}
              <TextInput
                label={TextHandler.getRegisterText(14, this.state.selectedLanguage)}
                value={this.state.confirmation}
                isSecured={true}
                handleChange={this._handlePasswordConfirmationChange}
              />
              {/*terms and conditions grid*/}
              <TermsAndConditionsGrid
                checkboxValidated={this.state.checkboxValidated}
                handleCheckboxPress={this._handleCheckboxPress}
                text={TextHandler.getRegisterText(15, this.state.selectedLanguage)}
              />
              {/*Validate button*/}
              <WhiteOutlinedButton
                onButtonPressed={this._checkCredentialsForRegistration}
                buttonText={TextHandler.getRegisterText(16, this.state.selectedLanguage)}
              />
            </View>
            {/*Terms and conditions popup*/}
            <SimpleContentDialog
              visible={this.state.termsPopupVisible}
              hideResetPopup={this._hideTermsPopup}
              title={TextHandler.getRegisterText(17, this.state.selectedLanguage)}
              innerText={TextHandler.getRegisterText(18, this.state.selectedLanguage)}
              onButton1Pressed={this._hideTermsPopup}
              button1Text={TextHandler.getRegisterText(19, this.state.selectedLanguage)}
              onButton2Pressed={this._handleTermsPopupDisplayAndValidate}
              button2Text={TextHandler.getRegisterText(20, this.state.selectedLanguage)}
            />
            {/*Snackbar error messages*/}
            <ErrorSnackbar
              visible={this.state.alertSnackbarVisible}
              hideSnackbar={() => {this.setState({alertSnackbarVisible: false})}}
              text={this._handleSnackbarMessages('error')}
            />
            {/*Snackbar OK messages*/}
            <SuccessSnackbar
              visible={this.state.okSnackbarVisible}
              hideSnackbar={this._handleOkSnackbarClose}
              text={this._handleSnackbarMessages('success')}
            />
            {
              //Spinning loader
              this.state.loaderVisible ? <LottieView style={styles.loader} source={require('../assets/animations/loaderSpin.json')} autoPlay={true} loop={true} /> : null
            }
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

RegisterScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    width: 'auto'
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center'
  },
})
