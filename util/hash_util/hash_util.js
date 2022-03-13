import sha256 from './sha256.js';
import md5 from './md5.js';

class HashUtil {
  sha256 = sha256;
  md5 = md5;
}

export default new HashUtil();
