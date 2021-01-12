import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

//defines double flags grid component
const DoubleFlagsGrid = (props) => {
  return (
    <View style={styles.buttonView}>
      <View style={styles.viewRow}>
        {/*English flag Button 1 container*/}
        <TouchableOpacity onPress={props.englishButtonClicked} style={styles.surface}>
          {/*Button logo image*/}
          <Image
            resizeMode='contain'
            source={require('../../assets/flags/englishFlag.png')}
          />
          {/*Button text view*/}
          <View style={styles.buttonTextView}>
            {/*Button text*/}
            <Text style={styles.buttonText}>English</Text>
          </View>
        </TouchableOpacity>
        {/*French button container*/}
        <TouchableOpacity onPress={props.frenchButtonCliked} style={styles.surface}>
          {/*French button logo image*/}
          <Image
            resizeMode='contain'
            source={require('../../assets/flags/frenchFlag.png')}
          />
          {/*Button text view*/}
          <View style={styles.buttonTextView}>
            {/*Button text*/}
            <Text style={styles.buttonText}>French</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default DoubleFlagsGrid;

DoubleFlagsGrid.propTypes = {
  englishButtonClicked: PropTypes.func,
  frenchButtonCliked: PropTypes.func
};

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 60
  },
  viewRow: {
    flexDirection: 'row',
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
  buttonTextView: {
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'normal',
    marginTop: 10
  },
})
