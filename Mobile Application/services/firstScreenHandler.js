import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Login from '../screens/login.js';
import Home from '../screens/home.js';
import Loading from '../screens/loading.js';
import LanguageSelection from '../screens/languageSelection.js';
import * as Services from '../services/services.js';
import * as Storage from '../services/serviceStorage.js';

export default class FirstScreenHandler extends Component {
  constructor (props) {
     super(props)
     this.state = {
       userLogged: false,
       selectedLanguage: '',
       sessionToken: '',
       loading: true,
     }
     this._userCredentialsStatus = this._userCredentialsStatus.bind(this);
  }

  //function called when component is created
  async componentDidMount() {
    //get the selected language from persistent storage
    const lang = await Storage.getUserSelectedLanguage('selectedLanguage');
    //get user credentials from user storage
    const credentials = await Storage.getUserCredentials();
    //check the account status
    const accountStatus = await this._userCredentialsStatus(lang, credentials);
    if (accountStatus !== false) {
      //set the selected language
      this.setState({selectedLanguage: lang});
      //user is already log into the service
      this.setState({userLogged: true});
    }
    //deactivate loading state
    this.setState({loading: false});
  }

  //fix Warning: Can't perform a React state update on an unmounted component
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  //check validity of session token, if valid refresh it
  async _userCredentialsStatus(lang, credentials) {
    //get the user ID from persistent storage
    const userId = await Storage.getUserId();
    //user ID and session token are OK
    if (credentials.sessionToken !== '' && userId !== '') {
      //defines constant data for the handleToken route
      const data = {
        token: credentials.sessionToken,
        tokenType: 'sessionToken',
        userId: userId,
      }
      //update session token
      let ret = await Services.handleSessionToken(data);
      if (ret) {
        //store the new session token
        return await Storage.updateToken('sessionToken', ret);
      }
    }
    //user ID or session token KO
    else {
      return false;
    }
  }

  render() {
    return (
      this.state.loading === true ? <Loading /> :
      this.state.selectedLanguage === '' ? <LanguageSelection {...this.props} /> :
      this.state.userLogged === true ? <Home {...this.props} {...this.state}/> : <Login {...this.props}/>
    );
  }
}
