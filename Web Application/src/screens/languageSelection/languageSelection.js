import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import Logo from '../../assets/logo.png';
import DoubleFlagsGrid from '../../components/grids/doubleFlagsGrid.js';
import Login from '../login/login.js';
import * as Storage from '../../services/serviceStorage.js';
import * as TextHandler from '../../services/languagesHandler.js';
import './languageSelection.css';

export default class LanguageSelection extends React.Component {
  constructor (props) {
     super(props);
     this.state = {
       selectedLanguage: 'english',
     };
     this._updateSelectedLanguage = this._updateSelectedLanguage.bind(this);
  }

  //function called when component is created
  async componentDidMount () {
    //get the selected language from persistent storage
    const lang = await Storage.getUserSelectedLanguage();
    if (lang !== '') {
      //set the selected language state
      this.setState({selectedLanguage: lang});
    }
  }

  //function used to update selected language and go to login page
  async _updateSelectedLanguage(lang) {
    //set the selected language state
    this.setState({selectedLanguage: lang});
    //set selected language into persistent storage
    await Storage.storeUserSelectedLanguage(lang);
    //display login page
    this._goToLoginPage();
  }

  //function used to render the login page
  _goToLoginPage() {
    ReactDOM.render(<Login {...this.state}/>, document.getElementById('root'));
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
          {/*logo image*/}
          <img
            src={Logo}
            alt='Logo'
            className='logo'
            style={{marginBottom: '6em', marginTop: '-4em'}}
          />
          {/*page title*/}
          <p id='title'>{TextHandler.getLanguageSelectionText(1, this.state.selectedLanguage)}</p>
          {/*page grid content*/}
          <DoubleFlagsGrid
            updateLanguage={this._updateSelectedLanguage}
            lang1={TextHandler.getLanguageSelectionText(2, this.state.selectedLanguage)}
            lang2={TextHandler.getLanguageSelectionText(3, this.state.selectedLanguage)}
          />
        </Container>
      </React.Fragment>
    );
  }
}
