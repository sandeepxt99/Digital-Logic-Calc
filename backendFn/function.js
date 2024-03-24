import {
  reverseString as reverseStringUfn,
  findBits as findBitsUfn,
  toCharacterValue as toCharacterValueUfn,
  toNumberValue as toNumberValueUfn,
  addZerosToValue as addZerosToValueUfn,
  checkDecimalOrBcd,
} from "./utilsFn.js";

function anyBaseToDecimal(value, base) {
  console.log(value, base, "anyBaseToDecimal");
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

// function anyBaseToAnyBaseShortcut(value, fromBase, toBase) {
//   value = value.toUpperCase();

//   let minusFlage = false;
//   if (value[0] == "-") {
//     minusFlage = true;
//     value = value.slice(1);
//   }

//   fromBase = parseInt(fromBase);
//   toBase = parseInt(toBase);
//   let fromBit = findBitsUfn(fromBase);
//   let toBit = findBitsUfn(toBase);

//   if (fromBit == 0 || toBit == 0) return;

//   let value2 = value;
//   if (fromBase != 2) {
//     value2 = "";
//     for (let i = 0; i < value.length; i++) {
//       if (value[i] == ".") value2 += ".";
//       else {
//         let temp = anyBaseToAnyBase(value[i], fromBase, 2);
//         temp = addZerosToValueUfn(temp, fromBit - temp.length, -1);
//         // console.log(temp);
//         value2 += temp;
//       }
//     }
//   }

//   let i =
//     value2.indexOf(".") == -1 ? value2.length - 1 : value2.indexOf(".") - 1;
//   let j = i + 2,
//     n = value2.length;

//   let result = "";

//   while (i >= 0) {
//     let fromI = i - toBit + 1 >= 0 ? i - toBit + 1 : 0;
//     let temp = value2.slice(fromI, i + 1);
//     i -= toBit;
//     result = anyBaseToAnyBase(temp, 2, toBase) + result;
//   }

//   if (j < n) result += ".";

//   while (j <= n) {
//     let temp = value2.slice(j, j + toBit);
//     j = j + toBit;
//     // console.log(temp);
//     if (toBit - temp.length)
//       temp = addZerosToValueUfn(temp, toBit - temp.length, 1);

//     result += anyBaseToAnyBase(temp, 2, toBase);
//   }

//   if (minusFlage) result = "-" + result;
//   return result;
// }

function anyBaseToAnyBaseShortcut(value, fromBase, toBase) {
  value = value.toUpperCase();
  let htmlRenderValueArr = [] // for html 

  let minusFlage = false;
  if (value[0] == "-") {
    minusFlage = true;
    value = value.slice(1);
  }

  fromBase = parseInt(fromBase);
  toBase = parseInt(toBase);
  let fromBit = findBitsUfn(fromBase);
  let toBit = findBitsUfn(toBase);

  if (fromBit == 0 || toBit == 0) return null;

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
        let tmpObj = {
          key: value[i],
          value: temp
        }
        htmlRenderValueArr.push(tmpObj)
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
    let temp_val_2 = anyBaseToAnyBase(temp, 2, toBase)

    if (toBit - temp.length)
      temp = addZerosToValueUfn(temp, toBit - temp.length, 0);

    result = temp_val_2 + result;
    if (fromBase == 2) htmlRenderValueArr.unshift({ key: temp, value: temp_val_2 });
  }

  if (j < n) result += ".";

  while (j <= n) {
    let temp = value2.slice(j, j + toBit);
    j = j + toBit;
    // console.log(temp);
    if (toBit - temp.length)
      temp = addZerosToValueUfn(temp, toBit - temp.length, 1);

    let temp_val_2 = anyBaseToAnyBase(temp, 2, toBase)
    result += temp_val_2;
    if (fromBase == 2) htmlRenderValueArr.push({ key: temp, value: temp_val_2 });

  }

  if (minusFlage) result = "-" + result;

  console.log(result, htmlRenderValueArr, 'at the end');


  return { result, htmlRenderValueArr };
}

// any base to BCD

function anyBaseToBcd(value, base) {
  if (Number(base) != 10) value = anyBaseToDecimal(value, base); //

  console.log(value);
  let negativeFlage = value[0] == "-";

  if (negativeFlage) value = value.slice(1);
  let result = "";

  for (let i = 0; i < value.length; i++) {
    if (value[i] == ".") result += ".";
    else {
      let tempResult = decimalToAnyBase(value[i], 2);
      result += addZerosToValueUfn(tempResult, 4 - tempResult.length, -1);
    }
  }

  return negativeFlage ? "-" + result : result;
}

// bcd to any base

function bcdToAnyBase(value, base) {
  let negativeFlage = value[0] == "-";
  if (negativeFlage) value = value.slice(1);

  let i = value.indexOf('.')
  if (i == -1) i = value.length;
  let j = value.length;
  let result = ''
  let temp = '', startIdx = 0;
  while (j > i) {
    startIdx = 0;
    let flage = false;
    if (j - 4 > i) startIdx = j - 4;
    else {
      startIdx = i + 1;
      flage = true;
    }
    temp = anyBaseToAnyBase((addZerosToValueUfn(value.slice(startIdx, j), 4 - (j - startIdx), -1)), 2, base)
    console.log(temp, 'temp');

    if (flage) {
      j = i;
      result = `.${temp}` + result;
    }
    else {
      j = startIdx
      result = temp + result;
    }
  }

  console.log(result);

  while (i > 0) {
    startIdx = i - 4 >= 0 ? i - 4 : 0;
    temp = anyBaseToAnyBase(addZerosToValueUfn(value.slice(startIdx, i), 4 - (i - startIdx), -1), 2, base);
    i = startIdx;
    console.log(temp, 'temp');

    result = temp + result;
  }

  console.log(result);
  return negativeFlage ? "-" + result : result;
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
  let result = parseFloat(decVal1) - parseFloat(decVal2);
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
  let quotient = Number(decVal1) / Number(decVal2);
  quotient = decimalToAnyBase(`${quotient}`, 2) || '';
  return quotient;
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
  // base 
  let baseComp = base ** bits - value;
  // base -1 
  let baseMinusOneComp = baseComp - 1;
  baseComp = decimalToAnyBase(baseComp, base);
  baseMinusOneComp = decimalToAnyBase(baseMinusOneComp, base);

  baseMinusOneComp = addZerosToValueUfn(baseMinusOneComp, bits - baseMinusOneComp.length, -1)
  baseComp = addZerosToValueUfn(baseComp, bits - baseComp.length, -1)
  return [baseMinusOneComp, baseComp];
}

function subtractByComplement(val1, val2) {
  let base = 2;
  base = checkDecimalOrBcd(val1) ? 10 : 2;
  if (base == 2) base = checkDecimalOrBcd(val2) ? 10 : 2;

  // console.log('base', base);

  let k = val1.length > val2.length ? val1.length : val2.length

  val2 = addZerosToValueUfn(val2, k - val2.length, -1)
  console.log(val1, val2);
  let complementArr = complement(val2, base);

  let comp1 = complementArr[0],
    comp2 = complementArr[1];

  // console.log(comp1, comp2);

  let add_1 = '', carry = '', res_1 = ''

  if (base == 10) add_1 = `${Number(comp1) + Number(val1)}`  // decimal 
  else if (base == 2) add_1 = binaryAddition(comp1, val1) // binary 

  add_1 = addZerosToValueUfn(add_1, k - add_1.length, -1)
  if (k < add_1.length) {
    carry = add_1[0]
    add_1 = add_1.slice(1)
  }

  if (carry) {
    if (base == 10) res_1 = `${Number(carry) + Number(add_1)}`
    else if (base == 2) res_1 = binaryAddition(carry, add_1)
  }
  else {
    res_1 = '-' + complement(add_1, base)[0]
  }
  // handling n complement 

  let add_2 = '', carry2 = '', res_2 = ''
  if (base == 10) add_2 = `${Number(comp2) + Number(val1)}`
  else if (base == 2) add_2 = binaryAddition(comp2, val1);

  add_2 = addZerosToValueUfn(add_2, k - add_2.length, -1)
  if (k < add_2.length) {
    carry2 = add_2[0];
    add_2 = add_2.slice(1)
  }

  if (carry2) {
    res_2 = add_2
  }
  else {
    res_2 = '-' + complement(add_2, base)[1]
  }

  return {
    base1: base - 1,
    base2: base,
    comp1,
    comp2,
    add_1,
    add_2,
    carry,
    carry2,
    res_1,
    res_2
  }
}

// ******************************** BCD ********************************//

function bcdAddition(val1, val2) {
  let decimalFlage = false;

  decimalFlage = checkDecimalOrBcd(val1)
  if (!decimalFlage) decimalFlage = checkDecimalOrBcd(val2)

  if (!decimalFlage) {
    val1 = bcdToAnyBase(val1, 10);
    val2 = bcdToAnyBase(val2, 10);
  }

  // val1 & val2 are decimal

  console.log(val1, val2);

  let result = Number(val1) + Number(val2);

  result = anyBaseToBcd(`${result}`, 10);

  return result;
}

// bcd subtraction
function bcdSubtraction(val1, val2) {
  let decimalFlage = false;

  decimalFlage = checkDecimalOrBcd(val1)
  if (!decimalFlage) decimalFlage = checkDecimalOrBcd(val2)

  if (!decimalFlage) {
    val1 = bcdToAnyBase(val1, 10);
    val2 = bcdToAnyBase(val2, 10);
  }

  // val1 & val2 are decimal

  let result = Number(val1) - Number(val2);

  result = anyBaseToBcd(`${result}`, 10);

  return result;
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

export {
  anyBaseToAnyBase,
  anyBaseToAnyBaseShortcut,
  complement,
  binaryAddition,
  binarySubtraction,
  binaryMultiplication,
  binaryDivision,
  bcdAddition,
  bcdSubtraction,
  subtractByComplement,
  anyBaseToBcd
};

// prev = 733 