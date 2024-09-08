import CryptoJS from "crypto-js";
const EncryptPassword = (Password) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const encryptedPassword = CryptoJS.AES.encrypt(
    Password,
    secretKey
  ).toString();
  return encryptedPassword;
};

export default EncryptPassword;
