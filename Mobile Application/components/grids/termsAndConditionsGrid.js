import React from 'react';
import {Checkbox} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

//defines terms and conditions grid component
const TermsAndConditionsGrid = (props) => {
  return (
    <View style={styles.checkboxView}>
      {/*Terms and conditions checkbox*/}
      <Checkbox
        status={props.checkboxValidated ? 'checked' : 'unchecked'}
        onPress={props.handleCheckboxPress}
        color='white'
        uncheckedColor='white'
      />
      {/*Terms and conditions text*/}
      <Text style={styles.conditions}>
      {
        props.text
      }
      </Text>
    </View>
  );
}
export default TermsAndConditionsGrid;

TermsAndConditionsGrid.propTypes = {
  checkboxValidated: PropTypes.bool,
  handleCheckboxPress: PropTypes.func,
  text: PropTypes.string,

};

const styles = StyleSheet.create({
  checkboxView: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 45,
    marginRight: 45
  },
  conditions: {
    color: 'white'
  },
})
