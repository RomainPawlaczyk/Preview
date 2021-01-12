import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

const LoadingScreen = () => {
 return (
   <View style={{ width: '100%', height: '100%' }}>
     {/*Background image*/}
     <ImageBackground
       style={ styles.imgBackground }
       resizeMode='cover'
       source={require('../assets/backgrounds/orange.png')}
     >
     </ImageBackground>
   </View>
 );
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingScreen;
