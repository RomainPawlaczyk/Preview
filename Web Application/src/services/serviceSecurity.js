import CryptoES from 'crypto-es';

//used to get a random secret used by encode / decode
//simpliest 'singleton' implementation
export function getRandomSecret() {
  //get random secret
  let secret = localStorage.getItem('secret');
  //random secret NOT exist
  if (secret === null ||secret === '') {
    //define random secret size (between 30 and 40 length)
    const secretLength = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
    //char string
    const pool = '!"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    //define length of possible char string
    const poolLength = pool.length;
    //secret definition
    secret = '';
    for (let i = 0; i < secretLength; i++) {
      //pick one random char in pool string and add it to secret
      secret += pool.charAt(Math.floor(Math.random() * poolLength));
    }
    //set random secret into persistant storage
    localStorage.setItem('secret', secret);
  }
  return secret;
}

//encode data received as parameter
export function encode(data) {
  if (!data) {
    return;
  }
  let encoded = CryptoES.TripleDES.encrypt(JSON.stringify(data), getRandomSecret()).toString();
  return CryptoES.enc.Base64.stringify(CryptoES.enc.Utf8.parse(encoded));
}

//decode data received as parameter
export function decode(data) {
  if (!data) {
    return;
  }
  let decoded = CryptoES.enc.Base64.parse(data).toString(CryptoES.enc.Utf8)
  let bytes = CryptoES.TripleDES.decrypt(decoded, getRandomSecret()).toString(CryptoES.enc.Utf8);
  return JSON.parse(bytes);
}
