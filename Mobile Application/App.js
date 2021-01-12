import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login.js';
import Register from './screens/register.js';
import Home from './screens/home.js';
import FirstScreenHandler from './services/firstScreenHandler.js';
import Settings from './screens/settings.js';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'FirstScreenHandler'}>
          <Stack.Screen name='FirstScreenHandler' component={FirstScreenHandler}/>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Register' component={Register}/>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Settings' component={Settings}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};


export default App;
