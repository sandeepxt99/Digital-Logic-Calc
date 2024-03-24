// fn for remove space from the value string

function removeSpace(string) {
  let result = "";

  for (let i = 0; i < string.length; i++) {
    if (string[i] != " ") {
      result += string[i];
    }
  }
  return result;
}

//**  fn for add zeros to value in the backward    **/

function addZerosToValue(value, noOfZeros, spin) {
  if (parseInt(spin) == 1) {
    for (let i = 1; i <= noOfZeros; i++) {
      value += "0";
    }
  } else {
    let result = "";
    for (let i = 1; i <= noOfZeros; i++) {
      result += "0";
    }
    value = result + value;
  }
  return value;
}

// fn for removing zeros from beginning of string **/

function removeZerosFromValue(value) {
  let result = "";
  let flage = false;
  for (let i = 0; i < value.length; i++) {
    if (value[i] != "0") {
      result += value[i];
      flage = true;
    } else if (flage) {
      result += value[i];
    }
  }

  if (result.length == 0) return "0";
  return result;
}

// ** a value to hexadecimal or more representation ** //

function toCharacterValue(value) {
  let numValue = parseInt(value) + 55;
  if (numValue > 90) return `,${value},`;
  return `${String.fromCharCode(numValue)}`;
}


function toNumberValue(value) {
  value = value.toUpperCase();

  if (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90)
    return value.charCodeAt(0) - 55;
  return parseInt(value);
}

//** a fn to find bit of the base */

function findBits(base) {
  base = parseInt(base);
  let count = 0;
  while (base > 0 && base % 2 == 0) {
    base /= 2;
    count++;
  }

  return base == 1 ? count : 0;
}

function reverseString(str) {
  let resultStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    resultStr += str.charAt(i);
  }
  return resultStr;
}

function checkDecimalOrBcd(value) {
  let val = ''
  for (let i = 0; i < value.length; i++) {
    val = value.charAt(i);
    if (val == '.' || val == ' ') continue
    if (val != '0' && val != '1') return true
  }
  return false;
}




export {
  reverseString,
  findBits,
  removeZerosFromValue,
  toCharacterValue,
  toNumberValue,
  addZerosToValue,
  checkDecimalOrBcd,
};


