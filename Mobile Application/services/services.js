import * as axios from 'axios';

//api gateway address
const host = 'https://follow-them.herokuapp.com';

//api call to log user
export async function userLogin(credentials) {
  try {
    const res = await axios.post(host+'/api/user/signIn', credentials);
    //handle user api errors
    if (res.data.error) {
      return null;
    }
    return res.data;
  }
  catch(error) {
    console.log('Error with function userLogin : ', error);
    return null;
  }
}

//api call to register user
export async function registerUser(credentials) {
  try {
    const res = await axios.post(host+'/api/user/signUp', credentials);
    //handle user api errors
    if (res.data.error) {
      return false;
    }
    return true;
  }
  catch(error) {
    console.log('Error with function registerUser : ', error);
    return false;
  }
}

//api call to confirm user email
export async function confirmEmail(data) {
  try {
    const res = await axios.post(host+'/api/user/confirmUserEmailLink', data);
    //handle user api errors
    if (res.data.error) {
        return false;
    }
    return true;
  }
  catch(error) {
    console.log('Error with function confirmEmail : ', error);
    return false;
  }
}

//api call to reset user password
export async function resetPassword(data) {
  try {
    const res = await axios.post(host+'/api/user/resetPasswordLink', data);
    //handle user api errors
    if (res.data.error) {
      return false;
    }
    return true;
  }
  catch(error) {
    console.log('Error with function resetPassword : ', error);
    return false;
  }
}

//api call to check and update user session token
export async function handleSessionToken(data) {
  try {
    let res = await axios.post(host+'/api/user/handleTokenVerification', data);
    if (res.status === 200) {
      return res.data.message;
    }
    else {
      return null;
    }
  }
  catch(error) {
    console.log('Error with function handleSessionToken : ', error);
    return null;
  }
}

//api call to validate user first connection
export async function validateFirstConnection(data) {
  try {
    let res = await axios.post(host+'/api/user/validateFirstConnection', data);
    if (res.status === 201) {
      return true;
    }
    else {
      return false;
    }
  }
  catch(error) {
    console.log('Error with function validate first connection : ', error);
    return false;
  }
}
