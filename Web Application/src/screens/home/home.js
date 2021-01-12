import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '../../components/grids/homeGrid.js';
import SmallHomeGrid from '../../components/grids/smallHomeGrid.js';
import Settings from '../settings/settings.js';
import * as Storage from '../../services/serviceStorage.js';
import * as TextHandler from '../../services/languagesHandler.js';
import Logo from '../../assets/logo.png';
import './home.css';

export default class Home extends React.Component {
  constructor (props) {
     super(props);
     this.state = {
       appBarWidth: 0,
       selectedLanguage: '',
       isLargeGridDisplayed: true
     };
     this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  //function called when component is created
  componentDidMount () {
    this.setState({selectedLanguage: this.props.selectedLanguage});
    Storage.storeUserSelectedLanguage(this.props.selectedLanguage);
    //create window resize listener
    window.addEventListener('resize', this._handleHomeGrids);
    this._handleHomeGrids();
  }

  //function called when component is removed
  componentWillUnmount() {
    //remove window resize listener
    window.removeEventListener('resize', this._handleHomeGrids);
  }

  _handleHomeGrids = () => {
    if (window.innerWidth >= 500) {
      this.setState({isLargeGridDisplayed: true});
    }
    else {
      this.setState({isLargeGridDisplayed: false});
    }
  }

  //function used to handle button click
  async _handleButtonClick(button) {
    //settings button clicked
    if (button === 'settings') {
      ReactDOM.render(<Settings {...this.state}/>, document.getElementById('root'));
    }
  }

  render() {
    return (
      /*Fragment component*/
      <React.Fragment>
        {/*Container with image background*/}
        <Container
          maxWidth='sm'
          className='container'
          style={this.state.isLargeGridDisplayed ?
            {backgroundImage: 'linear-gradient(#ff6600, #f94000)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'} :
            {backgroundImage: 'linear-gradient(#ff6600, #f94000)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          {/*logo image*/}
          <img
            src={Logo}
            alt='Logo'
            className='logo'
            style={this.state.isLargeGridDisplayed ? {marginBottom: '10%'} : {marginBottom: '5%'}}
          />
          {/*buttons grid*/}
          {
            this.state.isLargeGridDisplayed ?
            <Grid
              handleClick={this._handleButtonClick}
              button1={TextHandler.getHomeText(1, this.state.selectedLanguage)}
              button2={TextHandler.getHomeText(2, this.state.selectedLanguage)}
              button3={TextHandler.getHomeText(3, this.state.selectedLanguage)}
              button4={TextHandler.getHomeText(4, this.state.selectedLanguage)}
              button5={TextHandler.getHomeText(5, this.state.selectedLanguage)}
              button6={TextHandler.getHomeText(6, this.state.selectedLanguage)}
            />
            :
            <SmallHomeGrid
              handleClick={this._handleButtonClick}
              button1={TextHandler.getHomeText(1, this.state.selectedLanguage)}
              button2={TextHandler.getHomeText(2, this.state.selectedLanguage)}
              button3={TextHandler.getHomeText(3, this.state.selectedLanguage)}
              button4={TextHandler.getHomeText(4, this.state.selectedLanguage)}
              button5={TextHandler.getHomeText(5, this.state.selectedLanguage)}
              button6={TextHandler.getHomeText(6, this.state.selectedLanguage)}
            />
          }
        </Container>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  selectedLanguage: PropTypes.string,
};
