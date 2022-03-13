class SecurityUtil {
  /**
   *
   * @param { string } xssProofString Escapes all possible character that could be manipulated in an xss attack
   * @returns An escaped xss proof version of the original string
   */

  xssProofString(string) {
    let escapedString = '';

    for (let char of string) {
      switch (char) {
        case '<':
          escapedString += '&lt;';
          break;
        case '>':
          escapedString += '&gt;';
          break;
        case '&':
          escapedString += '&amp;';
          break;
        case '/':
          escapedString += '&#x2F;';
          break;
        case '"':
          escapedString += '&quot;';
          break;
        case "'":
          escapedString += '&#x27;';
          break;
        default:
          escapedString += char;
      }
    }

    return escapedString;
  }
}

export default new SecurityUtil();
