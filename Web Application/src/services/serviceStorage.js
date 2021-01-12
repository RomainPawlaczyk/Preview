const security = require('./serviceSecurity');

//used to get user credentials information from persistent storage
export function getUserCredentials() {
  let data = {
    email: '',
    sessionToken: '',
  }
  data.email = security.decode(localStorage.getItem('email'));
  data.sessionToken = security.decode(localStorage.getItem('sessionToken'));
  return data;
}

//used to get selected language information from persistent storage
export function getUserSelectedLanguage() {
  try {
    const data = localStorage.getItem('selectedLanguage');
    if (data === 'english' || data === 'french') {
      return data;
    }
    else {
      //console.log('Error, selectedLanguage not found');
      //console.log(data);
      return '';
    }
  }
  catch (error) {
    console.log('Error with getUserSelectedLanguage function : ', error);
    return '';
  }
}

//used to store secret used to encore / decode data
export function storeSecret(secret) {
  try {
    localStorage.setItem('secret', secret);
    return true;
  }
  catch (error) {
    console.log('Error with storeSecret function : ', error);
    return false;
  }
}

//used to get selected language information from persistent storage
export function getSecret() {
  try {
    const data = localStorage.getItem('secret');
    return data;
  }
  catch (error) {
    console.log('Error with getSecret function : ', error);
    return '';
  }
}

//used to get user id information from persistent storage
export function getUserId() {
  try {
    const data = localStorage.getItem('userId');
    if (data !== null && data !== '') {
      return security.decode(data);
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

//used to store uselected language into persistent storage
export function storeUserSelectedLanguage(lang) {
  try {
    localStorage.setItem('selectedLanguage', lang);
    return true;
  }
  catch (error) {
    console.log('Error with storeUserSelectedLanguage function : ', error);
    return false;
  }
}

//used to store tokens into persistent storage
export function updateToken(tokenType, token) {
  try {
    if (tokenType === 'session') {
      token = security.encode(token);
      localStorage.setItem('sessionToken', token);
    }
    else if (tokenType === 'accessToken') {
      token = security.encode(token);
      localStorage.setItem('accessToken', token);
    }
    return true;
  }
  catch (error) {
    console.log('Error with updateToken function : ', error);
    return false;
  }
}

//used to reset user data into persistent storage
export function resetUserData() {
  try {
    localStorage.setItem('email', '');
    localStorage.setItem('sessionToken', '');
    localStorage.setItem('userId', '');
  }
  catch (error) {
    console.log('Error with resetUserData function : ', error);
  }
}

//used to store user data into persistent storage
export function storeUserData(data) {
  try {
    data.email = security.encode(data.email);
    data.sessionToken = security.encode(data.sessionToken);
    data.userId = security.encode(data.userId);
    localStorage.setItem('email', data.email);
    localStorage.setItem('sessionToken', data.sessionToken);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('selectedLanguage', data.selectedLanguage);
  }
  catch (error) {
    console.log('Error with storeUserData function : ', error);
  }
}
