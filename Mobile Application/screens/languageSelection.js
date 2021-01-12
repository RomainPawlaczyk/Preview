import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, Image , TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Services from '../services/services.js';
import * as Storage from '../services/serviceStorage.js';
import * as TextHandler from '../services/languagesHandler.js';
import DoubleFlagsGrid from '../components/grids/doubleFlagsGrid.js';

export default class LanguageSelection extends Component {
  constructor (props) {
     super(props)
  };

  //function used when user click on the english button
  _handleEnglishButtonClick = async () => {
    //store the selected language into the persistent storage
    await Storage.storeUserSelectedLanguage('english');
    //go to the login screen
    this.props.navigation.navigate('Login', {selectedLanguage: 'english'});
  }

  //function used when user click on the french button
  _handleFrenchButtonClicked = async () => {
    //store the selected language into the persistent storage
    await Storage.storeUserSelectedLanguage('french');
    //go to the login screen
    this.props.navigation.navigate('Login', {selectedLanguage: 'french'});
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
        {/*page inner text*/}
        <Text style={styles.presentation}>Please select application language</Text>
        {/*flags buttons grid*/}
        <DoubleFlagsGrid
          englishButtonClicked={this._handleEnglishButtonClick}
          frenchButtonCliked={this._handleFrenchButtonClicked}
        />
      </ImageBackground>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  presentation: {
    color: 'white',
    fontSize: 21,
    textAlign: 'center',
    fontFamily: 'normal',
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
})
