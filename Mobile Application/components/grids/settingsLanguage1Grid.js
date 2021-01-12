import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {RadioButton} from 'react-native-paper';
import PropTypes from 'prop-types';

//defines english language grid component
const SettingsLanguage1Grid = (props) => {
  return (
    <View style={styles.itemView}>
      {/*Language 1 radio button*/}
      <RadioButton
        value="english"
        color='white'
        status={props.selectedLanguage === 'english' ? 'checked' : 'unchecked'}
        onPress={props.onEnglishButtonPressed}
      />
      {/*Language 1 flag logo*/}
      <Image
        resizeMode='contain'
        style={styles.thumbnail}
        source={require('../../assets/flags/englishFlag.png')}
      />
      {/*Language 1 text*/}
      <Text style={styles.itemText}>{props.text}</Text>
    </View>
  );
}
export default SettingsLanguage1Grid;

SettingsLanguage1Grid.propTypes = {
  selectedLanguage: PropTypes.string,
  text: PropTypes.string,
  onEnglishButtonPressed: PropTypes.func
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  thumbnail: {
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    color: 'white',
    fontSize: 18,
    marginTop: 4,
    marginLeft: 5
  },
})
