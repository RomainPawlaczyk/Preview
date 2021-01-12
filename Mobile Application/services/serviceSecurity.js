import CryptoES from 'crypto-es';
import AsyncStorage from '@react-native-community/async-storage';

//used to get a random secret used by encode / decode
//simpliest 'singleton' implementation
export async function getRandomSecret() {
  //get random secret
  let secret = await AsyncStorage.getItem('secret');
  //random secret NOT exist
  if (secret === null ||secret === '') {
    //define random secret length (between 30 & 40)
    const secretLength = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
    //random char string
    const pool = '!"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    //define length of char string
    const poolLength = pool.length;
    //secret definition
    secret = '';
    for (let i = 0; i < secretLength; i++) {
      //pick one random char in pool string and add it to secret
      secret += pool.charAt(Math.floor(Math.random() * poolLength));
    }
    //set random secret into persistent storage
    await AsyncStorage.setItem('secret', secret);
  }
  return secret;
}

//used to encrypt data
export async function encode(data) {
  //check if data exist
  if (!data) {
    return;
  }
  //get random secret
  const secret = await getRandomSecret();
  //return encrypted data
  return CryptoES.TripleDES.encrypt(data, secret).toString();

}

//used to decrypt data
export async function decode(data) {
  //check if data exist
  if (!data) {
    return;
  }
  //get random secret
  const secret = await getRandomSecret();
  //decrypt data
  const bytes = CryptoES.TripleDES.decrypt(data, secret);
  //return decoded data as string
  return bytes.toString(CryptoES.enc.Utf8);
}
