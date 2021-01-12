import React from 'react';
import Login from '../screens/login/login.js';
import Home from '../screens/home/home.js';
import LanguageSelection from '../screens/languageSelection/languageSelection.js';
import * as Storage from './serviceStorage.js';
import * as Services from './apiServices.js';

export default class FirstScreenHandler extends React.Component {
  constructor (props) {
     super(props);
     this.state = {
       userLogged: false,
       selectedLanguage: '',
       sessionToken: '',
       userId: '',
     };
     this._userCredentialsStatus = this._userCredentialsStatus.bind(this);
  }

  //function called when component is created
  async componentDidMount () {
    document.title = 'Preview';
    //check user credentials stored into persistent storage
    const ret = await this._userCredentialsStatus();
    if (ret === true) {
      this.setState({userLogged: true});
    }
  }

  //check validity of session token, if valid refresh it
  async _userCredentialsStatus() {
    //get the application language from the persistent storage
    const lang = await Storage.getUserSelectedLanguage('selectedLanguage');
    this.setState({selectedLanguage: lang});
    //get the user credentials from the persistent storage
    const credentials = await Storage.getUserCredentials();
    //get the user ID
    const userId = await Storage.getUserId();
    //set the user ID state
    this.setState({userId: userId});
    //check credentials session token and user id
    if (credentials.sessionToken !== '' && userId !== '') {
      //defines user constant
      const data = {
        token: credentials.sessionToken,
        tokenType: 'sessionToken',
        userId: userId,
      }
      //Check token validity
      let ret = await Services.handleSessionToken(data);
      //token must be updated
      if (ret !== false) {
        Storage.updateToken('sessionToken', ret);
        return true;
      }
      //token error (display login page)
      return false;
    }
    //handle credentials and user id error (display login page)
    else {
      return false;
    }
  }

  render() {
    return (
      this.state.selectedLanguage === '' ? <LanguageSelection /> :
      this.state.userLogged === true ? <Home selectedLanguage={this.state.selectedLanguage}/> : <Login selectedLanguage={this.state.selectedLanguage}/>
    );
  }
}
