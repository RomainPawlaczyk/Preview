import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Home from '../home/home.js';
import Login from '../login/login.js';
import Container from '@material-ui/core/Container';
import AppBar from '../../components/appBar.js';
import LanguageRadioButton from '../../components/radioButtons/languageRadioButton.js';
import EnglishFlag from '../../assets/englishFlag.png';
import FrenchFlag from '../../assets/frenchFlag.png';
import Button from '../../components/buttons/whiteOutlinedButton.js';
import * as Storage from '../../services/serviceStorage.js';
import * as TextHandler from '../../services/languagesHandler.js';
import './settings.css';

export default class Settings extends React.Component {
  constructor (props) {
     super(props);
     this.state = {
       selectedLanguage: '',
       appBarWidth: 0,
       leftMarginSubtitle: '',
       englishRadioButtonSelected: '',
       frenchRadioButtonSelected: '',
     };
     this._containerRef = React.createRef();
     this._handleDisconnection = this._handleDisconnection.bind(this);
     this._updateDimensions = this._updateDimensions.bind(this);
     this._returnToPreviousPage = this._returnToPreviousPage.bind(this);
     this._handleRadioButtonChange = this._handleRadioButtonChange.bind(this);
  }

  //function called when component is created
  componentDidMount () {
    //update selected radio button with current selected language
    this.setState({selectedLanguage: this.props.selectedLanguage});
    if (this.props.selectedLanguage === 'english') {
      this.setState({englishRadioButtonSelected: true});
      this.setState({frenchRadioButtonSelected: false});
    }
    else if (this.props.selectedLanguage === 'french') {
      this.setState({englishRadioButtonSelected: false});
      this.setState({frenchRadioButtonSelected: true});
    }
    //update appBar width
    this._updateDimensions();
    //create window resize listener
    window.addEventListener('resize', this._updateDimensions);  }

  //function called when component is removed
  componentWillUnmount() {
    //remove window resize listener
    window.removeEventListener('resize', this._updateDimensions);
  }

  //function used to handle button click
  async _handleDisconnection() {
    //reset persistent storage
    Storage.resetUserData();
    //load login page
    ReactDOM.render(<Login {...this.state}/>, document.getElementById('root'));
  }

  //function used for update the dimentions of app bar and terms and conditions text width
  _updateDimensions() {
    //get the container width
    let width = this._containerRef.current.offsetWidth;
    //set the app bar width
    this.setState({appBarWidth: width});
  }

  //function used to return to the login page
  _returnToPreviousPage() {
    ReactDOM.render(<Home {...this.state}/>, document.getElementById('root'));
  }

  //function used to update the selected language
  async _handleRadioButtonChange() {
    if (this.state.selectedLanguage === 'english') {
      //set the selected language state
      this.setState({selectedLanguage: 'french'});
      //update the selected language into the persistent storage
      await Storage.storeUserSelectedLanguage('french');
    }
    else if (this.state.selectedLanguage === 'french') {
      //set the selected language state
      this.setState({selectedLanguage: 'english'});
      //update the selected language into the persistent storage
      await Storage.storeUserSelectedLanguage('english');
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
            title={TextHandler.getSettingsText(1, this.state.selectedLanguage)}
            subtitle={TextHandler.getSettingsText(2, this.state.selectedLanguage)}
            returnToPreviousPage={this._returnToPreviousPage}
          />
          {/*page title*/}
          <h1 id='pageTitle'>{TextHandler.getSettingsText(3, this.state.selectedLanguage)}</h1>
          {/*language selection div*/}
          <div style={{width: '80%'}}>
            {/*language selection title*/}
            <h2 className='title' style={{marginTop: '2em'}}>{TextHandler.getSettingsText(4, this.state.selectedLanguage)}</h2>
            {/*english language div*/}
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '2em'}}>
              {/*language selection radio button*/}
              <LanguageRadioButton
                selectedLanguage={this.state.selectedLanguage}
                buttonName='english'
                handleRadioButtonChange={this._handleRadioButtonChange}
              />
              {/*language flag*/}
              <img
                src={EnglishFlag}
                alt='English Flag'
                style={{width: '2.5em', height: '2.5em', marginTop: '1em',marginLeft: '1em'}}
              />
              {/*language text*/}
              <span style={{marginTop: '1.4em', marginLeft: '1em', color: 'white', fontWeight: 'bold', fontSize: '1.1em'}}>{TextHandler.getSettingsText(5, this.state.selectedLanguage)}</span>
            </div>
            {/*french language div*/}
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '1em'}}>
            {/*language selection radio button*/}
              <LanguageRadioButton
                selectedLanguage={this.state.selectedLanguage}
                buttonName='french'
                handleRadioButtonChange={this._handleRadioButtonChange}
              />
              {/*language flag*/}
              <img
                src={FrenchFlag}
                alt='French Flag'
                style={{width: '2.5em', height: '2.5em', marginTop: '1em', marginLeft: '1em'}}
              />
              {/*language text*/}
              <span style={{marginTop: '1.4em', marginLeft: '1em', color: 'white', fontWeight: 'bold', fontSize: '1.1em'}}>{TextHandler.getSettingsText(6, this.state.selectedLanguage)}</span>
            </div>
          </div>
          {/*disconnect button*/}
          <Button
            variant='outlined'
            className='input'
            onClick={() => {this._handleDisconnection()}}
            style={{marginTop: '5em'}}
          >
          {
            TextHandler.getSettingsText(7, this.state.selectedLanguage)
          }
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

Settings.propTypes = {
  selectedLanguage: PropTypes.string,
};
