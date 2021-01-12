import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

//defines login bottom button component
const BottomButton = (props) => {
  return (
    <Button
      icon='account-plus'
      mode='contained'
      onPress={props.onButtonPressed}
      style={props.keyboardOpen === true ? styles.buttonBottomOpen : styles.buttonBottom}
      color='white'>
      {
        props.buttonText
      }
    </Button>
  );
}
export default BottomButton;

BottomButton.propTypes = {
  buttonText: PropTypes.string,
  keyboardOpen: PropTypes.bool,
  onButtonPressed: PropTypes.func
};

const styles = StyleSheet.create({
  buttonBottom:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FF6347',
    height: 45,
  },
  buttonBottomOpen:{
    width: 0,
    height: 0
  },
})
