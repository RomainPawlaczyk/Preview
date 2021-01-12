import React from 'react';
import {TextInput, Button, Portal, Dialog, Paragraph} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

//defines textfield component
const TextfieldDialog = (props) => {
  return (
    <Portal>
      <Dialog
         visible={props.visible}
         onDismiss={props.hideResetPasswordPopup}>
         {/*Reset password popup title*/}
        <Dialog.Title style={{marginBottom: 20}}>{props.title}</Dialog.Title>
        <Dialog.Content>
          {/*Reset password popup inner text*/}
          <Paragraph>{props.innerText}</Paragraph>
          {/*Reset password popup email field*/}
          <TextInput style={styles.textInputPopup}
            mode='flat'
            label={props.textinputLabel}
            secureTextEntry={false}
            underlineColor='black'
            value={props.textinputValue}
            onChangeText={resetEmail => props.handleTextinputChange(resetEmail)}
            type='email'
            theme={{
               colors: {
                  placeholder: 'orange', text: 'black', primary: 'black',
                  underlineColor: 'orange'
               }
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          {/*Reset password popup leave button*/}
          <Button style={styles.button1} mode='contained' color={'transparent'} onPress={props.onButton1Pressed}>{props.button1Text}</Button>
          {/*Reset password popup validate button*/}
          <Button
            mode='contained'
            color={'transparent'}
            style={styles.button2}
            disabled={props.resetEmail === '' ? true : false}
            onPress={props.onButton2Pressed}>
            {props.button2Text}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
export default TextfieldDialog;

TextfieldDialog.propTypes = {
  resetPasswordPopupVisible: PropTypes.bool,
  hideResetPasswordPopup: PropTypes.func,
  title: PropTypes.string,
  innerText: PropTypes.string,
  textinputLabel: PropTypes.string,
  textinputValue: PropTypes.string,
  handleTextinputChange: PropTypes.func,
  onButton1Pressed: PropTypes.func,
  onButton2Pressed: PropTypes.func,
  button1Text: PropTypes.string,
  button2Text: PropTypes.string,
};

const styles = StyleSheet.create({
  textInputPopup:{
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'transparent',
  },
  button1: {
    borderWidth: 1,
    borderColor: 'black',
    elevation: 0,
    marginRight: 5
  },
  button2: {
    borderWidth: 1,
    borderColor: 'orange',
    elevation: 0
  }
})
