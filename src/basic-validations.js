export default {
  required: function (field, value, prop) {
    return prop ? !value : false
  },

  minLength: function (field, value, prop) {
    return prop && value ? value.length < prop : false;
  },

  maxLength: function (field, value, prop) {
    return prop && value ? value.length > prop : false;
  },

  email: function (field, value, prop) {
    return prop && value ? !(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)) : false
  },

  min: function (field, value, prop) {
    return !isFinite(value) || parseFloat(value) >= prop;
  },

  max: function (field, value, prop) {
    return !isFinite(value) || parseFloat(value) <= prop;
  },

  pattern: function (field, value, prop) {
    return !value ? false : !prop.test(value);
  },

  equalTo: function (field, value, prop) {
    return !value ? false : !prop == value;
  },

  oneOf: function (field, value, prop) {
    return !value ? false : prop.indexOf(value) == -1;
  },

  url: function (field, value, prop) {
    return value ? false : !(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value))
  },

  promise: function (field, value, prop) {
    if (typeof prop == 'function') {
      return prop(field, value)
    }
    throw new Error("FormValidation: type promise must be a function!")
  },
  digits: function (field, value) {
    return !field || /^\d+$/.test(value);
  },
  creditcard: function (field, value, prop) {
    if (!value) {
      return false;
    }
    // accept only spaces, digits and dashes
    if (/[^0-9 \-]+/.test(value)) {
      return false;
    }
    var nCheck = 0,
      nDigit = 0,
      bEven = false,
      n, cDigit;

    value = value.replace(/\D/g, "");

    // Basing min and max length on
    // http://developer.ean.com/general_info/Valid_Credit_Card_Types
    if (value.length < 13 || value.length > 19) {
      return false;
    }

    for (n = value.length - 1; n >= 0; n--) {
      cDigit = value.charAt(n);
      nDigit = parseInt(cDigit, 10);
      if (bEven) {
        if (( nDigit *= 2 ) > 9) {
          nDigit -= 9;
        }
      }
      nCheck += nDigit;
      bEven = !bEven;
    }

    return ( nCheck % 10 ) === 0;
  }

}