import {
  reverseString as reverseStringUfn,
  findBits as findBitsUfn,
  toCharacterValue as toCharacterValueUfn,
  toNumberValue as toNumberValueUfn,
  addZerosToValue as addZerosToValueUfn,
} from "./utilsFn.js";

function anyBaseToDecimal(value, base) {
  value = value.toUpperCase();
  let minusFlage = false;
  if (value[0] == "-") {
    minusFlage = true;
    value = value.slice(1);
  }
  // console.log(value);
  let i = value.indexOf(".") == -1 ? value.length - 1 : value.indexOf(".") - 1; // index of before decimal point
  let j = i + 2; // index of after decimal point

  let beforeDecimalSum = 0,
    afterDecimalSum = 0;

  let powerIdx = 0;

  for (; i >= 0; i--) {
    beforeDecimalSum += Math.pow(base, powerIdx++) * toNumberValueUfn(value[i]);
  }

  powerIdx = -1;

  for (; j < value.length; j++) {
    afterDecimalSum += Math.pow(base, powerIdx) * toNumberValueUfn(value[j]);
    // console.log(Math.pow(base, powerIdx));
    // console.log(toNumberValueUfn(value[j]));
    powerIdx--;
    // console.log(afterDecimalSum, "with in afterdecimal");
  }

  let result = `${beforeDecimalSum + afterDecimalSum}`;
  if (minusFlage) result = "-" + result;
  return result;
}

function decimalToAnyBase(value, base) {
  value = value.toString();
  let i = value.length - 1; // index of before decimal point
  let flage = false;
  let minusFlage = false;
  if (value[0] == "-") {
    minusFlage = true;
    value = value.slice(1);
  }
  // console.log(value);
  if (value.indexOf(".") != -1) {
    i = value.indexOf(".") - 1;
    flage = true;
  }

  let j = i + 1; // index of after decimal point

  let numVal1 = parseInt(value.slice(0, i + 1)) || 0;
  let numVal2 = parseFloat(value.slice(j, j + 6)) || 0;

  let beforeDecimalSum = "",
    afterDecimalSum = "";

  // to handle before decimal portion
  while (numVal1) {
    let remainder = numVal1 % base;
    beforeDecimalSum +=
      remainder > 9 ? toCharacterValueUfn(remainder) : remainder.toString();
    numVal1 = parseInt(numVal1 / base);
  }

  beforeDecimalSum = reverseStringUfn(beforeDecimalSum);
  if (beforeDecimalSum.length == 0) beforeDecimalSum += "0";
  if (minusFlage) beforeDecimalSum = "-" + beforeDecimalSum;
  // console.log(beforeDecimalSum);

  if (!flage) return beforeDecimalSum;
  // to handle after decimal portion

  for (let i = 1; i < 5; i++) {
    numVal2 *= base;
    afterDecimalSum +=
      numVal2 > 9 ? toCharacterValueUfn(numVal2) : parseInt(numVal2).toString();
    numVal2 = numVal2 - parseInt(numVal2);
  }

  return beforeDecimalSum + "." + afterDecimalSum;
}

// combination of anyBaseToDecimal and decimalToAnyBase fn

function anyBaseToAnyBase(value, fromBase, toBase) {
  if (parseInt(fromBase) != 10) {
    value = anyBaseToDecimal(value, fromBase);
    // console.log(value, "anybasetoanybase");
  }
  if (parseInt(toBase) != 10) value = decimalToAnyBase(value, toBase);
  // console.log(value, 'anybasetoanybase');
  return value;
}

// any base to any base shortcut

function anyBaseToAnyBaseShortcut(value, fromBase, toBase) {
  value = value.toUpperCase();

  let minusFlage = false;
  if (value[0] == "-") {
    minusFlage = true;
    value = value.slice(1);
  }

  fromBase = parseInt(fromBase);
  toBase = parseInt(toBase);
  let fromBit = findBitsUfn(fromBase);
  let toBit = findBitsUfn(toBase);

  if (fromBit == 0 || toBit == 0) return;

  let value2 = value;
  if (fromBase != 2) {
    value2 = "";
    for (let i = 0; i < value.length; i++) {
      if (value[i] == ".") value2 += ".";
      else {
        let temp = anyBaseToAnyBase(value[i], fromBase, 2);
        temp = addZerosToValueUfn(temp, fromBit - temp.length, -1);
        // console.log(temp);
        value2 += temp;
      }
    }
  }

  let i =
    value2.indexOf(".") == -1 ? value2.length - 1 : value2.indexOf(".") - 1;
  let j = i + 2,
    n = value2.length;

  let result = "";

  while (i >= 0) {
    let fromI = i - toBit + 1 >= 0 ? i - toBit + 1 : 0;
    let temp = value2.slice(fromI, i + 1);
    i -= toBit;
    result = anyBaseToAnyBase(temp, 2, toBase) + result;
  }

  if (j < n) result += ".";

  while (j <= n) {
    let temp = value2.slice(j, j + toBit);
    j = j + toBit;
    // console.log(temp);
    if (toBit - temp.length)
      temp = addZerosToValueUfn(temp, toBit - temp.length, 1);

    result += anyBaseToAnyBase(temp, 2, toBase);
  }

  if (minusFlage) result = "-" + result;
  return result;
}

// any base to BCD

function anyBaseToBcd(value, base) {
  if (parseInt(base) != 10) value = anyBaseToDecimal(value, base); //

  // value = value.toUpperCase();
  // let i = value.indexOf(".") == -1 ? value.length - 1 : value.indexOf(".") - 1; // index of before decimal point
  // let j = i + 2; // index of after decimal point

  let result = "";

  for (let i = 0; i < value.length; i++) {
    if (value[i] == ".") result += ".";
    else {
      let tempResult = decimalToAnyBase(value[i], 2);
      // console.log(tempResult);
      result += addZerosToValueUfn(tempResult, 4 - tempResult.length, -1);
    }
  }

  return result;
}

// bcd to any base

function bcdToAnyBase(value, base) {
  // -000001000111
  let result = "";
  let negativeFlage = value[0] == "-";
  if (negativeFlage) value = value.slice(1);
  let i = value.length;
  while (i > 0) {
    let startIdx = i - 4 >= 0 ? i - 4 : 0;
    result += anyBaseToDecimal(value.slice(startIdx, i), 2);
    i -= 4;
  }
  result = reverseStringUfn(result);
  if (negativeFlage) result = "-" + result;
  return result;
}

// binary to grey

function binaryToGrey(value, base) {
  if (parseInt(base) != 2) value = anyBaseToAnyBase(value, base, 2);

  let result = value[0];

  for (let i = 1; i < value.length; i++) {
    if (value[i] == ".") result += ".";
    else {
      if (value[i - 1] == ".") {
        if (i - 2 < 0) result += value[i];
        else if (value[i] == value[i - 2]) result += "0";
        else result += "1";
      } else {
        if (value[i] == value[i - 1]) result += "0";
        else result += "1";
      }
    }
  }

  return result;
}

//  grey to binary
function greyToBinary(value, base) {
  let result = value[0];

  for (let i = 1; i < value.length; i++) {
    if (value[i] == result[result.length - 1]) result += "0";
    else result += "1";
  }
  return result;
}

// ************************************************* calculation ***************************************************************//

// binary addition

// function binaryAddition(val1, val2) {
//   if (val1.length < val2.length) {
//     val1 = addZerosToValueUfn(val1, val2.length - val1.length, -1);
//   } else {
//     val2 = addZerosToValueUfn(val2, val1.length - val2.length, -1);
//   }

//   console.log(val1, val2);

//   let n = val1.length;
//   let result = "";
//   let carry = "0";
//   for (let i = n - 1; i >= 0; i--) {
//     if (carry == "1" && (val1[i] == val2[i]) == "1") {
//       result += "1";
//     } else if (carry == "0" && (val1[i] == val2[i]) == "1") {
//       result += "0";
//       carry = "1";
//     } else if (carry == "1" && val1[i] != val2[i]) {
//       result += "0";
//       carry = "1";
//     } else {
//       result += "1";
//       carry = "0";
//     }
//   }
//   if (carry == "1") result += "1";
//   result = reverseStringUfn(result);

//   return result;
// }

function binaryAddition(val1, val2) {
  let decVal1 = anyBaseToDecimal(val1, 2);
  let decVal2 = anyBaseToDecimal(val2, 2);
  // console.log(decVal1, decVal2);
  let result = parseFloat(decVal1) + parseFloat(decVal2);
  result = decimalToAnyBase(`${result}`, 2);
  return result;
}

// binary subtraction

function binarySubtraction(val1, val2) {
  let decVal1 = anyBaseToDecimal(val1, 2);
  let decVal2 = anyBaseToDecimal(val2, 2);
  let result = parseFloat(decVal2) - parseFloat(decVal1);
  // console.log(result);
  result = decimalToAnyBase(`${result}`, 2);
  return result;
}

// binary multiply

function binaryMultiplication(val1, val2) {
  let decVal1 = anyBaseToDecimal(val1, 2);
  let decVal2 = anyBaseToDecimal(val2, 2);
  let result = parseFloat(decVal1) * parseFloat(decVal2);
  console.log(result);
  result = decimalToAnyBase(`${result}`, 2);
  return result;
}

// binary demonstration multiplication

function binaryDemonstrativeMultiplication(val1, val2) {
  let res = [];
  let tempStr = "";
  let zeroN = val1.length;
  if (val1.indexOf(".") != -1) zeroN--;
  let zeroStr = "";
  zeroStr = addZerosToValueUfn(zeroStr, zeroN, 1);
  val1 = val1.replace(".", "");
  // console.log(val1, val2, zeroStr, zeroN, val1.length);
  for (let i = val2.length - 1; i >= 0; i--) {
    if (val2[i] == ".") continue;
    if (val2[i] == "1") {
      res.push(val1 + tempStr);
    } else {
      res.push(zeroStr + tempStr);
    }
    tempStr += "*";
  }

  return res;
}

// binary division

function binaryDivision(val1, val2) {
  let decVal1 = anyBaseToDecimal(val1, 2);
  let decVal2 = anyBaseToDecimal(val2, 2);
  let quotient = parseFloat(decVal1) / parseFloat(decVal2);
  let remainder = decVal1 - decVal2 * quotient;
  // console.log(result);
  remainder.toString().replace(".", "");
  quotient = decimalToAnyBase(`${quotient}`, 2);
  remainder = decimalToAnyBase(`${remainder}`, 2);

  console.log(quotient, remainder);
  // return result;
}

// binary demonstration division

function binaryDemonstrativeDivision(val1, val2) {
  let decVal1 = parseInt(anyBaseToDecimal(val1, 2));
  let bit = val2.length;
  let i = bit;
  console.log(decVal1, bit);
  let quotient = "",
    remainder = "";
  let remainderArr = [],
    valueArr = [];

  let temp = val2.slice(0, bit);
  if (temp.indexOf(".") !== -1) {
    temp = temp.replace(".", "");
    if (val2.length > bit) temp += val2[bit];
    else temp += "0";
    i++;
  }

  while (i < val2.length) {
    let decTemp = parseInt(anyBaseToDecimal(temp, 2));
    console.log(decTemp);
    if (decVal1 > decTemp) {
      valueArr.push("0");
      quotient += "0";
      temp += val2[i++];
      remainderArr(temp);
    } else {
      quotient += "1";
      valueArr.push(val1);
      temp = decimalToAnyBase(decTemp - decVal1, 2);
      temp += val2[i++];
      remainderArr(temp);
    }
  }

  console.log(quotient, valueArr, remainderArr);
}

// complement of the given base

function complement(value, base) {
  base = parseInt(base);
  let bits = value.length;
  value = anyBaseToDecimal(value, base);
  // base - 1

  let baseComp = base ** bits - value;

  let baseMinusOneComp = baseComp - 1;

  // console.log(baseComp, baseMinusOneComp);

  baseComp = decimalToAnyBase(baseComp, base);
  baseMinusOneComp = decimalToAnyBase(baseMinusOneComp, base);
  return [baseMinusOneComp, baseComp];
}

function subtractByComplement(val1, val2) {
  let base = 10;
  let complementArr = complement(val1, base);
  let bits = val1.length;

  let comp1 = complementArr[0],
    comp2 = complementArr[1];

  // console.log(comp1, comp2);

  let res1 = parseInt(val2) + parseInt(comp1);
  res1 = res1.toString();
  // console.log(res1, complementArr);

  // n-1
  if (bits == res1.length) {
    res1 = "-" + complement(res1, base)[0];
  } else {
    let temp = res1.slice(0, 1);
    res1 = parseInt(temp) + parseInt(res1.slice(1));
  }

  // n

  let res2 = parseInt(val2) + parseInt(comp2);
  res2 = res2.toString();

  if (bits == res2.length) {
    res2 = "-" + complement(res2, base)[1];
  } else {
    res2 = res2.slice(1);
  }

  // console.log(res1, res2);
}

function subtractByComplement2(val1, val2) {
  let base = 2;
  let complementArr = complement(val1, base);
  let bits = val1.length;

  // console.log(complementArr, bits);

  let comp1 = complementArr[0],
    comp2 = complementArr[1];

  console.log(comp1, comp2);

  // n-1

  let res1 = binaryAddition(comp1, val2);
  // console.log(res1);

  if (bits == res1.length) {
    res1 = "-" + complement(res1, base)[0];
  } else {
    let temp = res1.slice(0, 1);
    res1 = binaryAddition(temp, res1.slice(1));
  }

  // n

  let res2 = binaryAddition(comp2, val2);
  // console.log(res2);
  if (bits == res2.length) {
    res2 = "-" + complement(res2, base)[1];
  } else {
    // console.log("why", res2.length);
    res2 = res2.slice(1);
  }

  // console.log("final answer ", res1, res2);
}

// ******************************** BCD ********************************//

function bcdAddition(val1, val2) {
  let flage = false;
  for (let i = 0; i < val1.length; i++) {
    if (val1[i] == ".") continue;
    if (val1[i] != "0" && val1[i] != "1") {
      flage = true;
      break;
    }
  }
  for (let i = 0; i < val2.length; i++) {
    if (val2[i] == ".") continue;
    if (val2[i] != "0" && val2[i] != "1") {
      flage = true;
      break;
    }
  }
  if (flage == true) {
    console.log("Invalid Input");
    val1 = anyBaseToBcd(val1, "10");
    val2 = anyBaseToBcd(val2, "10");

    // return;
  }

  // console.log(val1, val2);

  // actual code start here

  let arrVal1 = [],
    arrVal2 = [];

  for (let i = val1.length; i > 0; ) {
    let temp = val1.slice(i - 4 < 0 ? 0 : i - 4, i);
    if (temp.length < 4) temp = addZerosToValueUfn(temp, 4 - temp.length, -1);
    // console.log("temp: ", temp);
    arrVal1.push(temp);
    i -= 4;
  }
  for (let i = val2.length; i > 0; ) {
    let temp = val2.slice(i - 4 < 0 ? 0 : i - 4, i);
    if (temp.length < 4) temp = addZerosToValueUfn(temp, 4 - temp.length, -1);
    arrVal2.push(temp);
    i -= 4;
  }

  arrVal1 = arrVal1.reverse();
  arrVal2 = arrVal2.reverse();

  let res1 = [],
    arrFlage = [],
    res2 = [];

  let end = arrVal1.length > arrVal2.length ? arrVal1.length : arrVal2.length;

  for (let i = 0; i < end; i++) {
    let temp = binaryAddition(arrVal1[i], arrVal2[i]);
    temp = addZerosToValueUfn(temp, 4 - temp.length, -1);
    res1.push(temp);
    if (parseInt(anyBaseToDecimal(temp, 2)) > 9) arrFlage.push(true);
    else arrFlage.push(false);
  }

  for (let i = 0; i < arrFlage.length; i++) {
    if (arrFlage[i] == true) res2.push("0110");
    else res2.push("0000");
  }

  let str1 = "",
    str2 = "";
  for (let i = 0; i < arrFlage.length; i++) {
    // finalRes.push(binaryAddition(res1[i], res2[i]));
    str1 += res1[i];
    str2 += res2[i];
  }

  let finalRes = binaryAddition(str1, str2);

  let addingZeroBit = 4 - (finalRes.length % 4 == 0 ? 4 : finalRes.length % 4);

  finalRes = addZerosToValueUfn(finalRes, addingZeroBit, -1);

  // console.log("arr", arrVal1, arrVal2);
  // console.log("main", res1, arrFlage, res2);
  // console.log("final", finalRes);
}

// bcd subtraction
function bcdSubtraction(val1, val2) {
  let decimalFlage = false;

  for (let i = 0; i < val1.length; i++) {
    if (val1[i] == ".") continue;
    if (val1[i] != "1" && val1[i] != "0") {
      decimalFlage = true;
      break;
    }
  }

  for (let i = 0; i < val2.length; i++) {
    if (val1[i] == ".") continue;
    if (val2[i] != "1" && val2[i] != "0") {
      decimalFlage = true;
      break;
    }
  }

  if (!decimalFlage) {
    val1 = bcdToAnyBase(val1, 10);
    val2 = bcdToAnyBase(val2, 10);
  }
  console.log(val1, val2);

  let res = parseFloat(val2) - parseFloat(val1);
  let negativeFlage = res < 0 ? true : false;
  res = anyBaseToBcd(`${Math.abs(res)}`, 10);
  if (negativeFlage) res = "-" + res;
  return res;
}

// ******************************** Floating  ********************************//

// floating

function floating(val, num) {
  val = val.toUpperCase();
  let e = 0,
    negativeFlage = false;

  let zeroStr = "0.";

  num = parseFloat(num);

  if (val[0] == "-") {
    negativeFlage = true;
    val = val.slice(1);
  }

  if (val.indexOf("E") != -1) {
    e = parseInt(val.slice(val.indexOf("E") + 1));
    val = val.slice(0, val.indexOf("E"));
  }

  // num = INT_MIN
  if (num != Number.MIN_VALUE) {
    e += num;

    val = val.replace(".", "");
    while (num--) {
      val = "0" + val;
    }
  } else {
    // auto
    let decimalIdx = val.indexOf(".") != -1 ? val.indexOf(".") : val.length;
    val = val.replace(".", "");
    e += decimalIdx;
  }

  val = zeroStr + val;
  if (e) val = val += `E${e.toString()}`;
  if (negativeFlage) val = `-${val}`;
  return val;
}

export { anyBaseToAnyBase };
