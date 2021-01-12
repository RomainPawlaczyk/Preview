import React from 'react';
import {TextInput, Button, Portal, Dialog, Paragraph} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

//defines multiple content popup dialog
const MultipleContentDialog = (props) => {
  return (
    <Portal>
      <Dialog
         visible={props.visible}
         onDismiss={props.hideEmailNotValidatedPopup}>
         {/*Popup title*/}
        <Dialog.Title style={{marginBottom: 20}}>{props.title}</Dialog.Title>
        <Dialog.Content>
          {/*Popup inner text*/}
          <Paragraph>{props.innerText}</Paragraph>
          <Paragraph>{props.innerText2}</Paragraph>
          <Paragraph>{props.innerText3}</Paragraph>
          {/*Popup textfield*/}
        </Dialog.Content>
        <Dialog.Actions>
          {/*Popup leave button*/}
          <Button style={styles.button1} mode='contained' color={'transparent'} onPress={props.onButton1Pressed}>{props.button1Text}</Button>
          {/*Popup validate button*/}
          <Button style={styles.button2}
            mode='contained'
            color={'transparent'}
            onPress={props.onButton2Pressed}>{props.button2Text}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
export default MultipleContentDialog;

MultipleContentDialog.propTypes = {
  EmailNotValidatedPopupVisible: PropTypes.bool,
  hideResetPasswordPopup: PropTypes.func,
  title: PropTypes.string,
  innerText: PropTypes.string,
  inner2Text: PropTypes.string,
  inner3Text: PropTypes.string,
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
    marginRight: 5,
  },
  button2: {
    borderWidth: 1,
    borderColor: 'orange',
    elevation: 0,
  }
})
