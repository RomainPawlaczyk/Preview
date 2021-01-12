import React from 'react';
import {Snackbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

//defines success snackbar component
const SuccessSnackbar = (props) => {
  return (
    <Snackbar style={styles.snackbar}
      theme={{
        colors: {
          accent: 'white', surface: 'white',
        },
      }}
      visible={props.visible}
      onDismiss={props.hideSnackbar}
      action={{
        label: 'x',
        onPress: () => {props.hideSnackbar}
      }}
    >
    {props.text}
    </Snackbar>
  );
}
export default SuccessSnackbar;

SuccessSnackbar.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  hideSnackbar: PropTypes.func,
  visible: PropTypes.bool
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: '#4CAF50',
    borderColor: 'white',
    borderWidth: 1,
    elevation: 2
  },
})
