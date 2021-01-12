import AsyncStorage from '@react-native-community/async-storage';
const security = require('./serviceSecurity');

//used to get user credentials information from persistent storage
export async function getUserCredentials() {
  let data = {
    email: '',
    sessionToken: '',
  }
  data.email = await getUserStoredData('email');
  data.sessionToken = await getUserStoredData('sessionToken');
  return data;
}

//used to get selected language information from persistent storage
export async function getUserSelectedLanguage() {
  try {
    const data = await AsyncStorage.getItem('selectedLanguage');
    if (data !== null && data !== '') {
      return data;
    }
    else {
      //console.log('Error, selectedLanguage not found');
      return 'english';
    }
  }
  catch (error) {
    console.log('Error with getUserSelectedLanguage function : ', error);
    return '';
  }
}

export async function getUserId() {
  try {
    const data = await AsyncStorage.getItem('userId');
    if (data !== null && data !== '') {
      const ret = await security.decode(data);
      return ret;
    }
    else {
      //console.log('Error, userId not found');
      return '';
    }
  }
  catch (error) {
    console.log('Error with getUserId function : ', error);
    return '';
  }
}

//used to get user id information from persistent storage
export async function getUserStoredData(field) {
  try {
    const data = await AsyncStorage.getItem(field);
    if (data !== null) {
      const ret = await security.decode(data);
      return ret;
    }
    else {
      //console.log('Error, field not found');
      return '';
    }
  }
  catch (error) {
    console.log('Error with getUserStoredData function : ' + error + 'field : ' + field);
    return '';
  }
}

//used to store uselected language into persistent storage
export async function storeUserSelectedLanguage(lang) {
  try {
    await AsyncStorage.setItem('selectedLanguage', lang);
    return true;
  }
  catch (error) {
    console.log('Error with storeUserSelectedLanguage function : ', error);
    return false;
  }
}

//used to store tokens into persistent storage
export async function updateToken(tokenType, token) {
  try {
    token = await security.encode(token);
    await AsyncStorage.setItem(tokenType, token);
    return true;
  }
  catch (error) {
    console.log('Error with updateToken function : ', error);
    return false;
  }
}

//used to reset user data into persistent storage
export async function resetUserData() {
  try {
    await AsyncStorage.setItem('email', '');
    await AsyncStorage.setItem('sessionToken', '');
    await AsyncStorage.setItem('userId', '');
  }
  catch (error) {
    console.log('Error with resetUserData function : ', error);
  }
}

//used to store user data into persistent storage
export async function storeUserData(data) {
  try {
    console.log(data.sessionToken);
    data.email = await security.encode(data.email);
    data.sessionToken = await security.encode(data.sessionToken);
    data.userId = await security.encode(data.userId);
    await AsyncStorage.setItem('email', data.email);
    await AsyncStorage.setItem('sessionToken', data.sessionToken);
    await AsyncStorage.setItem('userId', data.userId);
    await AsyncStorage.setItem('selectedLanguage', data.selectedLanguage);
  }
  catch (error) {
    console.log('Error with storeUserData function : ', error);
  }
}
