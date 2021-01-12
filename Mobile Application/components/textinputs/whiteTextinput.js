import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

//defines white textinput component
const ClassicTextInput = (props) => {
  return (
    <TextInput style={styles.textInput}
      mode='flat'
      underlineColor='white'
      label={props.label}
      value={props.value}
      secureTextEntry={props.isSecured}
      onChangeText={email => props.handleChange(email)}
      theme={{
         colors: {
            placeholder: 'white', text: 'white', primary: 'white',
            underlineColor: 'white'
         }
      }}
    />
  );
}
export default ClassicTextInput;

ClassicTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isSecured: PropTypes.bool,
  handleChange: PropTypes.func
};

const styles = StyleSheet.create({
  textInput:{
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 15,
    width: 350,
    backgroundColor: 'transparent',
  },
})
