import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

//defines white outlined button component
const WhiteOutlinedButton = (props) => {
  return (
    <Button
      mode='text'
      onPress={props.onButtonPressed}
      style={styles.button}
      color='white'>
      {
        props.buttonText
      }
    </Button>
  );
}
export default WhiteOutlinedButton;

WhiteOutlinedButton.propTypes = {
  buttonText: PropTypes.string,
  onButtonPressed: PropTypes.func
};

const styles = StyleSheet.create({
  button:{
    marginTop: 50,
    width: 355,
    borderColor: 'white',
    borderWidth: 1
  },
})
