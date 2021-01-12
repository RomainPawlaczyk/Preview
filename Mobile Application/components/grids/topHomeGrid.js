import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

//defines home top grid component
const TopHomeGrid = (props) => {
  return (
    <View style={styles.viewRow}>
      {/*Button 1 container*/}
      <TouchableOpacity onPress={props.handleButton1Click} style={styles.surface}>
        {/*Button logo image*/}
        <Image
          resizeMode='contain'
          source={require('../../assets/icons/lessons.png')}
        />
        {/*Button text view*/}
        <View style={styles.buttonTextView}>
          {/*Button text*/}
          <Text style={styles.buttonText}>{props.button1Text}</Text>
        </View>
      </TouchableOpacity>
      {/*Button 2 container*/}
      <TouchableOpacity onPress={props.handleButton2Click} style={styles.surface}>
        {/*Button logo image*/}
        <Image
          resizeMode='contain'
          source={require('../../assets/icons/exercices.png')}
        />
        {/*Button text view*/}
        <View style={styles.buttonTextView}>
          {/*Button text*/}
          <Text style={styles.buttonText}>{props.button2Text}</Text>
        </View>
      </TouchableOpacity>
      {/*Button 3 container*/}
      <TouchableOpacity onPress={props.handleButton3Click} style={styles.surface}>
        {/*Button logo image*/}
        <Image
          resizeMode='contain'
          source={require('../../assets/icons/search.png')}
        />
        {/*Button text view*/}
        <View style={styles.buttonTextView}>
          {/*Button text*/}
          <Text style={styles.buttonText}>{props.button3Text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default TopHomeGrid;

TopHomeGrid.propTypes = {
  button1Text: PropTypes.string,
  button2Text: PropTypes.string,
  button3Text: PropTypes.string,
  handleButton1Click: PropTypes.func,
  handleButton2Click: PropTypes.func,
  handleButton3Click: PropTypes.func
};

const styles = StyleSheet.create({
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
    fontFamily: 'normal'
  },
})
