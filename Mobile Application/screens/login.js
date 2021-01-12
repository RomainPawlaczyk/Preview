import React, {Component} from 'react';
import {ImageBackground, StyleSheet, ScrollView, View, Image, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import * as Services from '../services/services.js';
import * as Storage from '../services/serviceStorage.js';
import * as TextHandler from '../services/languagesHandler.js';
import SuccessSnackbar from '../components/snackbars/successSnackbar.js';
import ErrorSnackbar from '../components/snackbars/errorSnackbar.js';
import TextInput from '../components/textinputs/whiteTextinput.js';
import WhiteOutlinedButton from '../components/buttons/whiteOutlinedButton.js';
import WhiteLinkButton from '../components/buttons/whiteLinkButton.js';
import BottomButton from '../components/buttons/bottomButton.js';
import TextfieldDialog from '../components/dialogs/textfieldDialog.js';
import MultipleContentDialog from '../components/dialogs/multipleContentDialog.js';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      selectedLanguage: '',
      sessionToken: '',
      keyboardOpen: false,
      resetEmail: '',
      creationAccountSnackVisible: true,
      alertSnackbarVisible: false,
      okSnackbarVisible: false,
      loaderVisible: false,
      resetPasswordPopupVisible: false,
      EmailNotValidatedPopupVisible: '',
      message: '',
      loading: true,
    };
  };

  //function called when component is created
  async componentDidMount() {
    //define keyboard open listener
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    //define keyboard close listener
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    //get user selected language
    const { lang } = this.props.route.params;
    this.setState({selectedLanguage: lang});
    this.setState({loading: false});
  }

  //function called when component is removed
  componentWillUnmount() {
    //remove keyboard open listener
    this.keyboardDidShowListener.remove();
    //remove keyboard close listener
    this.keyboardDidHideListener.remove();
  }

  //function called to update language user disconnection
  async shouldComponentUpdate() {
    this._checkAndUpdateLanguage();
  }

  //function used to update user selected language if needed
  async _checkAndUpdateLanguage() {
    const lang = await Storage.getUserSelectedLanguage('selectedLanguage');
    if (this.state.selectedLanguage !== lang) {
      this.setState({selectedLanguage: lang});
    }
  }

  //function used by the open keyboard listener
  _keyboardDidShow = () => {
    //set keyboard open state
    this.setState({keyboardOpen: true});
  }

  //function used by the keyboard close listener
  _keyboardDidHide = () => {
    //set keyboard close state
    this.setState({keyboardOpen: false});
  }

  //function used to display reset password popup
  _showResetPasswordPopup = () => this.setState({resetPasswordPopupVisible: true});

  //function used to hide reset password popup
  _hideResetPasswordPopup = () => this.setState({resetPasswordPopupVisible: false});

  //function used to display email not validated popup
  _showEmailNotValidatedPopup = () => this.setState({EmailNotValidatedPopupVisible: true});

  //function used to hide email not validated popup
  _hideEmailNotValidatedPopup = () => this.setState({EmailNotValidatedPopupVisible: false});

  //function used to handle the email textfield change
  _handleEmailChange = (mail) => this.setState({email: mail});

  //function used to handle the password textfield change
  _handlePasswordChange = (password) => this.setState({password: password});

  //function used to display register screen
  _goToRegisterPage = () => this.props.navigation.navigate('Register');

  //function used to handle the email textfield change in the forgot password popup
  _handleTextinputChange = (resetEmail) => this.setState({resetEmail: resetEmail});

  //function used to send a new email confirmation
  _sendEmailConfirmationLink = async () => {
    //activate loader spin
    this.setState({loaderVisible: true});
    //define user data constant
    const data = {
      email: this.state.email,
      language: this.state.selectedLanguage
    };
    //hide email not validated popup
    this._hideEmailNotValidatedPopup();
    //try to send email confirmation
    const ret = await Services.confirmEmail(data);
    //email confirmation sent
    if (ret) {
      this.setState({message: 'emailConfirmationLinkOk'});
      this.setState({okSnackbarVisible: true});
    }
    //handle email error
    else {
      this.setState({message: 'emailConfirmationLinkKo'});
      this.setState({alertSnackbarVisible: true});
    }
    //deactivate loader spin
    this.setState({loaderVisible: false});
  }

  //function used when user clicks on forgot password button
  _resetUserPassword = async () => {
    //hide reset password popup
    this._hideResetPasswordPopup();
    //define email regex
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //check email format with regex
    if (emailReg.test(this.state.resetEmail) === false) {
      //handle email format error
      this.setState({message: 'emailKo'});
      this.setState({alertSnackbarVisible: true});
      return;
    }
    //activate loader spin
    this.setState({loaderVisible: true});
    //define user data constant
    const data = {
      email: this.state.resetEmail,
      language: this.state.selectedLanguage
    };
    //try to reset password
    const ret = await Services.resetPassword(data);
    //email sent with success
    if (ret === true) {
      this.setState({message: 'resetEmailOk'});
      this.setState({okSnackbarVisible: true});
    }
    //handle email error
    else {
      this.setState({message: 'resetEmailKo'});
      this.setState({alertSnackbarVisible: true});
    }
    //deactivate loader spin
    this.setState({loaderVisible: false});
    //reset email state
    this.setState({resetEmail: ''});
  }

  //function used to get the snackbar messages
  _handleSnackbarMessages = (type) => {
    //success snackbar message
    if (type === 'success') {
      //reset password email success
      if (this.state.message === 'resetEmailOk') {
        return TextHandler.getLoginText(1, this.state.selectedLanguage);
      }
      //email confirmation success
      else if (this.state.message === 'emailConfirmationLinkOk') {
        return TextHandler.getLoginText(2, this.state.selectedLanguage);
      }
    }
    //error snackbar message
    else if (type === 'error') {
      //login failed
      if (this.state.message === 'loginKo') {
        return TextHandler.getLoginText(3, this.state.selectedLanguage);
      }
      //fields empty
      else if (this.state.message === 'fieldsKo') {
        return TextHandler.getLoginText(4, this.state.selectedLanguage);
      }
      //email format not valid
      else if (this.state.message === 'emailKo') {
        return TextHandler.getLoginText(5, this.state.selectedLanguage);
      }
      //reset email failed
      else if (this.state.message === 'resetEmailKo') {
        return TextHandler.getLoginText(6, this.state.selectedLanguage);
      }
      //email confirmation failed
      else if (this.state.message === 'emailConfirmationLinkKo') {
        return TextHandler.getLoginText(7, this.state.selectedLanguage);
      }
      //unexpected error
      else if (this.state.message === 'unexpectedError') {
        return TextHandler.getLoginText(8, this.state.selectedLanguage);
      }
    }
  }

  //function used to log user
  _login = async () => {
  //check empty fields
  if (this.state.email === '' || this.state.password === '') {
    this.setState({message: 'fieldsKo'});
    this.setState({alertSnackbarVisible: true});
    return;
  }
  //define email regex
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //check email format with regex
  if (emailReg.test(this.state.email) === false) {
    this.setState({message: 'emailKo'});
    this.setState({alertSnackbarVisible: true});
    return;
  }
  //define user credentials constant
  const credentials = {
    email: this.state.email,
    password: this.state.password
  };
  //activate loader spin
  this.setState({loaderVisible: true});
  //try to log user to the service
  let ret = await Services.userLogin(credentials);
  //login sucess
  if (ret) {
    //handle email not confirmed case
    if (ret.emailConfirmed === false) {
      this.setState({EmailNotValidatedPopupVisible: true});
      this.setState({loaderVisible: false});
      return;
    }
    //define constant user data
    let data = {
      email: this.state.email,
      password: this.state.password,
      sessionToken: ret.token,
      userId: ret.userId,
      selectedLanguage: this.state.selectedLanguage
    }
    //store user data into app persistent storage
    Storage.storeUserData(data);
    //check if it's user first connection
    if (ret.firstConnection === true) {
      //update data for the first connection validation
      data = {userId: ret.userId};
      //validate user first connection
      await Services.validateFirstConnection(data);
      //navigate to home page with first connection variable set to true
      this.props.navigation.navigate('Home', {firstConnection: true, selectedLanguage: this.state.selectedLanguage});
    }
    else {
      //navigate to home page with first connection variable set to false
      this.props.navigation.navigate('Home', {firstConnection: true, selectedLanguage: this.state.selectedLanguage});
    }
  }
  //handle error with login route
  else {
    this.setState({message: 'loginKo'});
    this.setState({alertSnackbarVisible: true});
  }
  //deactivate loader spin
  this.setState({loaderVisible: false});
}

  render() {
    return (
      /*Loading view displayed while handling componentDidMount function*/
      this.state.loading ? <View style={styles.mainView}></View> :
      <View style={styles.mainView}>
        {/*ScrollView*/}
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/*Background image*/}
          <ImageBackground
            style={ styles.imgBackground }
            resizeMode='cover'
            source={require('../assets/backgrounds/orange.png')}
          >
            {/*Container view*/}
            <View style={styles.container}>
              {/*Logo*/}
              <Image
                resizeMode='contain'
                style={styles.image}
                source={require('../assets/logos/logoWhite.png')}
              />
              {/*Email field*/}
              <TextInput
                label='Email'
                value={this.state.email}
                isSecured={false}
                handleChange={this._handleEmailChange}
              />
              {/*Password field*/}
              <TextInput
                label={TextHandler.getLoginText(9, this.state.selectedLanguage)}
                value={this.state.password}
                isSecured={true}
                handleChange={this._handlePasswordChange}
              />
              {/*Login button*/}
              <WhiteOutlinedButton
                onButtonPressed={this._login}
                buttonText={TextHandler.getLoginText(10, this.state.selectedLanguage)}
              />
              {/*Forgot password link*/}
              <WhiteLinkButton
                onButtonPressed={this._showResetPasswordPopup}
                buttonText={TextHandler.getLoginText(11, this.state.selectedLanguage)}
              />
              {/*Register button*/}
              <BottomButton
                onButtonPressed={this._goToRegisterPage}
                keyboardOpen={this.state.keyboardOpen}
                buttonText={TextHandler.getLoginText(12, this.state.selectedLanguage)}
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
                hideSnackbar={() => {this.setState({okSnackbarVisible: false})}}
                text={this._handleSnackbarMessages('success')}
              />
              {
                //Spinning loader
                this.state.loaderVisible ? <LottieView style={styles.loader} source={require('../assets/animations/loaderSpin.json')} autoPlay={true} loop={true} /> : null
              }
              {/*Reset password popup*/}
              <TextfieldDialog
                visible={this.state.resetPasswordPopupVisible}
                hideResetPasswordPopup={this._hideResetPasswordPopup}
                title={TextHandler.getLoginText(13, this.state.selectedLanguage)}
                innerText={TextHandler.getLoginText(14, this.state.selectedLanguage)}
                textinputLabel={TextHandler.getLoginText(15, this.state.selectedLanguage)}
                textinputValue={this.state.resetEmail}
                handleTextinputChange={this._handleTextinputChange}
                onButton1Pressed={this._hideResetPasswordPopup}
                button1Text={TextHandler.getLoginText(16, this.state.selectedLanguage)}
                onButton2Pressed={this._resetUserPassword}
                button2Text={TextHandler.getLoginText(17, this.state.selectedLanguage)}
              />
              {/*Email not validated popup*/}
              <MultipleContentDialog
                visible={this.state.EmailNotValidatedPopupVisible}
                hideEmailNotValidatedPopup={this._hideEmailNotValidatedPopup}
                title={TextHandler.getLoginText(18, this.state.selectedLanguage)}
                innerText={TextHandler.getLoginText(19, this.state.selectedLanguage)}
                innerText2={TextHandler.getLoginText(20, this.state.selectedLanguage)}
                innerText3={TextHandler.getLoginText(21, this.state.selectedLanguage)}
                onButton1Pressed={this._hideEmailNotValidatedPopup}
                button1Text={TextHandler.getLoginText(22, this.state.selectedLanguage)}
                onButton2Pressed={this._sendEmailConfirmationLink}
                button2Text={TextHandler.getLoginText(23, this.state.selectedLanguage)}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 100,
  },
  image: {
    aspectRatio: 2.1,
    resizeMode: 'contain',
    marginBottom: 20
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  mainView: {
    width: '100%',
    height: '100%'
  },
})
