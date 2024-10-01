import {sha256} from 'react-native-sha256';
import {randomBytes} from 'react-native-randombytes';

export async function generateServerSignature() {
  const signature =
    '0QI7CkVXHWig8dFL2qfRWjcp4ytFJJHevRafdNoVPaJBqJJEush3gblfR4p62YlF';
  const signatureEncoded = await sha256(signature);
  return signatureEncoded;
}

export async function generateServerAuthKey() {
  const secret = 'bbyusy8T2GnoWLd2dWgbIdy34Kwo7j7f';
  const secretEncoded = await sha256(secret);

  const buffer = randomBytes(50);
  const bufferHex = buffer.toString('hex');

  const token =
    bufferHex.slice(0, 100) + secretEncoded + bufferHex.slice(0, 10);
  return token;
}

export const ENDPOINT = 'https://api.ribub.com/main.php';
export const FILE_PATH = 'https://api.ribub.com/';
