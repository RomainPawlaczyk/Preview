import React from 'react';
import {Snackbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

//defines error snackbar component
const ErrorSnackbar = (props) => {
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
export default ErrorSnackbar;

ErrorSnackbar.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  hideSnackbar: PropTypes.func,
  visible: PropTypes.bool
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: '#EF5350',
    borderColor: 'white',
    borderWidth: 1,
    elevation: 10
  },
})
