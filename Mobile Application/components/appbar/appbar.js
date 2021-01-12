import React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';

//defines appbar component
const TopBar = (props) => {
  return (
    <Appbar.Header style={styles.appBar}>
      {/*Header goes back onButtonPressed*/}
      <Appbar.BackAction
        onPress={props.goBack}
        color='white'
      />
      {/*Header goes back text*/}
      <Appbar.Content style={styles.appBarContent}
        title={props.title}
        subtitle={props.subtitle}
        color='white'
      />
      {/*Header app logo*/}
      <Image resizeMode='contain' style={styles.logo} source={require('../../assets/logos/logoWhiteMin.png')} />
    </Appbar.Header>
  );
}
export default TopBar;

TopBar.propTypes = {
  goBack: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#FF6347',
  },
  appBarContent: {
    marginLeft: -10
  },
  logo: {
    width: '15%',
    resizeMode: 'contain',
    marginRight: 10
  },
})
