import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Services from '../services/services.js';
import * as Storage from '../services/serviceStorage.js';
import * as TextHandler from '../services/languagesHandler.js';
import TopHomeGrid from '../components/grids/topHomeGrid.js';
import BottomHomeGrid from '../components/grids/bottomHomeGrid.js';

export default class Home extends Component {
  constructor (props) {
    _componentIsMounted = false;
     super(props)
     this.state = {
       selectedLanguage: '',
       firstConnection: '',
     };
  };

  //function called when component is created
  async componentDidMount() {
    //set selected language
    this.setState({selectedLanguage: this.props.selectedLanguage});
  }

  //function called to update language after a goBack function from react-navigation
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

  //function used when button 1 is pressed
  _handleButton1Click = () => {
    console.log('placeholder 1 clicked');
  }

  //function used when button 2 is pressed
  _handleButton2Click = () => {
    console.log('placeholder 2 clicked');
  }

  //function used when button 3 is pressed
  _handleButton3Click = () => {
    console.log('placeholder 3 clicked');
  }

  //function used when button 4 is pressed
  _handleButton4Click = () => {
    console.log('placeholder 4 clicked');
  }

  //function used when button 5 is pressed
  _handleButton5Click = () => {
    console.log('placeholder 5 clicked');
  }

  //function used when settings button is pressed
  _handleButton6Click = () => {
    //go to the settings page
    this.props.navigation.navigate('Settings', {selectedLanguage: this.state.selectedLanguage});
  }

  render() {
    return (
      <View>
        {/*Background image*/}
        <ImageBackground
          style={ styles.imgBackground }
          resizeMode='cover'
          source={require('../assets/backgrounds/orange.png')}
        >
          {/*Top view with app logo*/}
          <View style={styles.topView}>
            <Image
              resizeMode='contain'
              style={styles.image}
              source={require('../assets/logos/logoWhite.png')}
            />
          </View>
          {/*Buttons container view*/}
          <View style={styles.buttonView}>
            {/*Top buttons view row*/}
            <TopHomeGrid
              button1Text={TextHandler.getHomeText(1, this.state.selectedLanguage)}
              button2Text={TextHandler.getHomeText(2, this.state.selectedLanguage)}
              button3Text={TextHandler.getHomeText(3, this.state.selectedLanguage)}
              handleButton1Click={this._handleButton1Click}
              handleButton2Click={this._handleButton2Click}
              handleButton3Click={this._handleButton3Click}
            />
            {/*Bottom buttons view row*/}
            <BottomHomeGrid
              button1Text={TextHandler.getHomeText(4, this.state.selectedLanguage)}
              button2Text={TextHandler.getHomeText(5, this.state.selectedLanguage)}
              button3Text={TextHandler.getHomeText(6, this.state.selectedLanguage)}
              handleButton1Click={this._handleButton4Click}
              handleButton2Click={this._handleButton5Click}
              handleButton3Click={this._handleButton6Click}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  selectedLanguage: PropTypes.string
};

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    marginTop: 140
  },
  image: {
    aspectRatio: 2.1,
    resizeMode: 'contain',
  },
  topView: {
    position: 'absolute',
    top: 40,
  },
  surface: {
    padding: 8,
    height: 140,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
})
