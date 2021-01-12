import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

//defines white link button component
 const WhiteLinkButton = (props) => {
  return (
    //link button
    <Button
      mode='text'
      onPress={props.onButtonPressed}
      style={styles.forgotPassword}
      color='white'
      uppercase={false}
    >
      <Text style={styles.textButton}>{props.buttonText}</Text>
    </Button>
  );
}
export default WhiteLinkButton;

WhiteLinkButton.propTypes = {
  buttonText: PropTypes.string,
  onButtonPressed: PropTypes.func
};

const styles = StyleSheet.create({
  forgotPassword:{
    color: 'white',
    marginTop: 25,
  },
  textButton: {
    fontSize: 14
  }
})
