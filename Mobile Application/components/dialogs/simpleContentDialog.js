import React from 'react';
import {TextInput, Button, Portal, Dialog, Paragraph} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

//defines simple content popup component
const SimpleContentDialog = (props) => {
  return (
    <Portal>
      <Dialog
         visible={props.visible}
         onDismiss={props.hideResetPopup}>
         {/*Email not validated popup title*/}
        <Dialog.Title style={{marginBottom: 20}}>{props.title}</Dialog.Title>
        <Dialog.Content>
          {/*Email not validated popup inner text*/}
          <Paragraph>{props.innerText}</Paragraph>
          {/*Email not validated popup email field*/}
        </Dialog.Content>
        <Dialog.Actions>
          {/*Email not validated popup leave button*/}
          <Button mode='contained' color={'transparent'} style={styles.button1} onPress={props.onButton1Pressed}>{props.button1Text}</Button>
          {/*Email not validated popup validate button*/}
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
export default SimpleContentDialog;

SimpleContentDialog.propTypes = {
  EmailNotValidatedPopupVisible: PropTypes.bool,
  hideResetPopup: PropTypes.func,
  title: PropTypes.string,
  innerText: PropTypes.string,
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
