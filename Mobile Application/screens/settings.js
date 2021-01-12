import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Appbar, Button, RadioButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import * as Services from '../services/services.js';
import * as Storage from '../services/serviceStorage.js';
import * as TextHandler from '../services/languagesHandler.js';
import AppBar from '../components/appbar/appbar.js';
import Language1Grid from '../components/grids/settingsLanguage1Grid.js';
import Language2Grid from '../components/grids/settingsLanguage2Grid.js';
import WhiteOutlinedButton from '../components/buttons/whiteOutlinedButton.js';

export default class Settings extends Component {
  constructor (props) {
     super(props)
     this.state = {
       selectedLanguage: '',
       loaderVisible: false,
     };
  };

  //function called when component is created
  async componentDidMount() {
    //get selectedLanguage from route
    const { selectedLanguage } = this.props.route.params;
    //set selected language into state
    this.setState({selectedLanguage: selectedLanguage});
  }

  //function used when user select english language
  _englishLanguageSelected = async () => {
    const lang = 'english'
    //activate loader spin
    this.setState({loaderVisible: true});
    //set selected language into state
    this.setState({ selectedLanguage: lang});
    //store selected language into persistent storage
    Storage.storeUserSelectedLanguage(lang);
    //get user ID
    const id = await Storage.getUserId();
    //define user data constant
    const data = {
      userId: id,
      selectedLanguage: lang
    }
    //deactivate loader spin
    this.setState({loaderVisible: false});
  }

  //function used when user select french language
  _frenchLanguageSelected = async () => {
    const lang = 'french'
    //activate loader spin
    this.setState({loaderVisible: true});
    //set selected language into state
    this.setState({ selectedLanguage: lang});
    //store selected language into persistent storage
    Storage.storeUserSelectedLanguage(lang);
    //get user ID
    const id = await Storage.getUserId();
    //define user data constant
    const data = {
      userId: id,
      selectedLanguage: lang
    }
    //deactivate loader spin
    this.setState({loaderVisible: false});
  }

  //function used when user click on Disconnect button
  _userDeconnection = async () => {
    //reset user data from persistent storage
    Storage.resetUserData();
    //navigate to login
    this.props.navigation.navigate('Login', {selectedLanguage: this.props.selectedLanguage});
  }

  render() {
    return (
      <View style={styles.container}>
        {/*App header*/}
        <AppBar
          goBack={() => {this.props.navigation.navigate('Home', {selectedLanguage: this.state.selectedLanguage})}}
          title={TextHandler.getSettingsText(1, this.state.selectedLanguage)}
          subtitle={TextHandler.getSettingsText(2, this.state.selectedLanguage)}
        />
        {/*ScrollView*/}
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/*Background image*/}
          <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../assets/backgrounds/orange.png')}
          >
            {/*Title view*/}
            <View style={styles.titleView}>
              {/*Title text*/}
              <Text style={styles.title}>{TextHandler.getSettingsText(3, this.state.selectedLanguage)}</Text>
            </View>
            {/*Inner view*/}
            <View>
              {/*Subtitle view*/}
              <View style={styles.subtitleView}>
                {/*Subtitle text*/}
                <Text style={styles.subtitle}>{TextHandler.getSettingsText(4, this.state.selectedLanguage)}</Text>
                {/*Language 1 view*/}
                <Language1Grid
                  selectedLanguage={this.state.selectedLanguage}
                  text={TextHandler.getSettingsText(5, this.state.selectedLanguage)}
                  onEnglishButtonPressed={this._englishLanguageSelected}
                />
                {/*Language 2 view*/}
                <Language2Grid
                  selectedLanguage={this.state.selectedLanguage}
                  text={TextHandler.getSettingsText(6, this.state.selectedLanguage)}
                  onFrenchButtonPressed={this._frenchLanguageSelected}
                />
              </View>
              {/*Disconnect button*/}
              <WhiteOutlinedButton
                onButtonPressed={this._userDeconnection}
                buttonText={TextHandler.getSettingsText(7, this.state.selectedLanguage)}
              />
            </View>
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

Settings.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object
};

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    justifyContent: 'center',
  },
  subtitleView: {
    marginTop: 40
  },
  themeView: {
    marginTop: 15,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
    marginTop: 10
  },
  container: {
   width: '100%',
   height: '100%',
   flex: 1
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
