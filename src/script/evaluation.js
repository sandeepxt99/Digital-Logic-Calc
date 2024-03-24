import { currInput, inputTags } from "./keyboard.style.js";
import {
  anyBaseToAnyBase,
  anyBaseToAnyBaseShortcut as anyBaseToAnyBaseShortcutFn,
  complement as complementFn,
  binaryAddition as binaryAdditionFn,
  binarySubtraction as binarySubtractionFn,
  binaryMultiplication as binaryMultiplicationFn,
  binaryDivision as binaryDivisionFn,
  bcdAddition as bcdAdditionFn,
  bcdSubtraction as bcdSubtractionFn,
  subtractByComplement as subtractByComplementFn,
  anyBaseToBcd as anyBaseToBcdFn
} from "../../backendFn/function.js";

import { reverseString as reverseStringUtFn, findBits as findBitsUtFn, addZerosToValue as addZerosToValueUtFn, checkDecimalOrBcd as checkDecimalOrBcdUtFn } from '../../backendFn/utilsFn.js'


// ***********   Optimization code ******************************** // 
// FCB == function control block 
const FCB = {
  convers: {},
  calcu: {},
  comple: {},
  float: {},
  canonic: {},
  simply: {},
  circ: {},
}
// ECB ==  Explaination Control Button 
const ECB = {
  convers: {},
  calcu: {},
  comple: {},
  float: {},
  canonic: {},
  simply: {},
  circ: {},
}

// used to check curr value is equal to prev value or not 

function CB_Checker(comp, valueObj, CB) {
  let returnFlage = true;
  if (CB == 'FCB' && Object.keys(FCB[comp]).length == 0) returnFlage = false;
  if (CB == 'ECB' && Object.keys(ECB[comp]).length == 0) returnFlage = false;
  if (returnFlage) {
    let tempArr = Object.keys(valueObj) || []
    for (let i = 0; i < tempArr.length; i++) {
      if ((CB == 'FCB' ? FCB[comp][tempArr[i]] : ECB[comp][tempArr[i]]) != valueObj[tempArr[i]]) {
        returnFlage = false;
        break;
      }
    }
  }

  FCB[comp] = valueObj
  if (CB == 'ECB') ECB[comp] = valueObj
  return returnFlage;
}


//************************************** conversion era **************** *//

let evalConversionConvertBtn = document.querySelector('.eval-conversion-convert-btn')
let conversionEvalBtn = document.querySelector("#conversion-eval-btn");
const evalConversionContainer = document.querySelector(".eval-conversion-container");
let conversExplainDisplayFlage = true;


evalConversionConvertBtn.addEventListener("click", () => {

  let utilsConversionFn_1_Out = utilsConversionFn_1();
  if (!utilsConversionFn_1_Out) return; // getting null value
  let { value, from, to } = utilsConversionFn_1_Out;

  // code for FCB 
  let FCB_Checker_Flage = CB_Checker('convers', { value, from, to }, 'FCB');
  if (!FCB_Checker_Flage) {
    console.log('Running....');
    conversionEvaluationFn(value, from, to)
  }
});

conversionEvalBtn.addEventListener("click", () => {
  let utilsConversionFn_1_Out = utilsConversionFn_1();
  if (!utilsConversionFn_1_Out) return; // getting null value
  let { value, from, to } = utilsConversionFn_1_Out;

  // code for FCB 
  let ECB_Checker_Flage = CB_Checker('convers', { value, from, to }, 'ECB');

  if (!ECB_Checker_Flage) {
    console.log('Running....');
    conversionEvaluationFn(value, from, to)
    conversionOtherConversionSummaryFn(value, from, to);
    conversionExplanationSummaryFn(value, from, to);
    conversionShortcutSummaryFn(value, from, to);
  }
  conversExplainDisplayFlage = displayToggleFn(conversExplainDisplayFlage, evalConversionContainer)

});

function conversionEvaluationFn(value, from, to) {
  let conversionAnswer = document.querySelector(".eval-conversion-answer");
  let result = anyBaseToAnyBase(value, from, to);
  conversionAnswer.innerHTML = result || '';
}

function conversionOtherConversionSummaryFn(value, from, to) {

  let conversionAnswer = document.querySelector(".eval-conversion-answer");
  if (conversionAnswer.innerHTML == "") return alert("Please Convert it first");

  let container = document.querySelectorAll(".detail-summary-box")[0];
  htmlAppendTreeClear([container]) // clear html child 

  let baseArr = [2, 8, 10, 16];

  for (let i = 0; i < baseArr.length; i++) {
    if (Number(from) != baseArr[i] && Number(to) != baseArr[i]) {
      const valContainer = document
        .getElementById("val-container-templet")
        .content.cloneNode(true);

      let base =
        baseArr[i] == "2"
          ? "Binary"
          : baseArr[i] == "8"
            ? "Octal"
            : baseArr[i] == "10"
              ? "Decimal"
              : "Hexadecimal";

      let tempVal_1 = anyBaseToAnyBase(value, from, baseArr[i]);

      valContainer.querySelector("label").innerHTML = base;
      valContainer.querySelector("p").innerHTML = tempVal_1;

      container.append(valContainer);
    }
  }
}

function conversionExplanationSummaryFn(value, from, to) {
  let pointIdx = value.indexOf("."), n = value.length;
  if (pointIdx == -1) pointIdx = n - 1;
  else pointIdx--;
  from = Number(from)

  // any base to decimal 
  console.log(pointIdx, from, to, value);

  let productRes = '', additionRes = '', newValue = value;
  let para = document.querySelector('.eval-conversion-container').querySelectorAll('.answer-para')
  let heading_1 = document.querySelector('#head-anybase-decimal');

  let evalConversionConversionDetailBox_1 = document.querySelector('#eval-conversion-conversion-detail-box-1')
  let evalConversionConversionDetailBox_2 = document.querySelector('#eval-conversion-conversion-detail-box-2')

  // clearing default display style 
  evalConversionConversionDetailBox_1.style.display = 'none';
  evalConversionConversionDetailBox_2.style.display = 'none';

  if (from == 10) {
    fromDecimal();
    evalConversionConversionDetailBox_2.style.display = 'block';
  }
  else if (to == 10) {
    toDecimal();
    evalConversionConversionDetailBox_1.style.display = 'block';

  }
  else {
    toDecimal();
    fromDecimal();
    evalConversionConversionDetailBox_1.style.display = 'block';
    evalConversionConversionDetailBox_2.style.display = 'block';
  }

  function toDecimal() {
    newValue = 0

    heading_1.innerHTML = `${from == 2 ? 'Binary' : from == 8 ? 'Octal' : from == 10 ? 'Decimal' : from == 16 ? 'Hexa Decimal' : `${from} base`
      } to Decimal`

    console.log(para);
    for (let i = 0; i < n; i++) {
      if (value[i] == '.') continue;
      productRes += `${value[i]}x${from}<sup>${pointIdx}</sup>`;
      additionRes += `${value[i] * Math.pow(from, pointIdx)}`
      newValue += value[i] * Math.pow(from, pointIdx);
      if (i != n - 1) {
        productRes += ' + ';
        additionRes += ' + ';
      }
      pointIdx--;
    }

    console.log(productRes, additionRes);
    para[0].innerHTML = productRes;
    para[1].innerHTML = additionRes;
    para[2].innerHTML = `${newValue}`;
  }

  function fromDecimal() {
    let tempValue = parseInt(newValue), base = '', finalAnswer = '';
    to = Number(to);
    let decimalAnybaseTableTemplate = document.querySelector('#decimal-anybase-table-template')
    let decimalToAnybaseTable = document.querySelector('#decimal-to-anybase-table').querySelector('tbody')
    htmlAppendTreeClear([decimalToAnybaseTable]) // clear 

    console.log(tempValue, to, from);

    let clone = '', cloneSubPart = ''

    while (tempValue > 0) {

      clone = decimalAnybaseTableTemplate.content.cloneNode(true);
      cloneSubPart = clone.querySelectorAll('td');

      cloneSubPart[0].innerHTML = `${to}`;
      cloneSubPart[1].innerHTML = `${tempValue}`;
      cloneSubPart[2].innerHTML = `${base}`;

      base = parseInt(tempValue % to);
      tempValue = parseInt(tempValue / to);
      decimalToAnybaseTable.append(clone);
      finalAnswer += `${base}`;
    }
    clone = decimalAnybaseTableTemplate.content.cloneNode(true);
    cloneSubPart = clone.querySelectorAll('td');

    cloneSubPart[1].innerHTML = `${tempValue}`;
    cloneSubPart[2].innerHTML = `${base}`;
    decimalToAnybaseTable.append(clone);
    finalAnswer = reverseStringUtFn(finalAnswer)

    // handling after decimal point
    let decimalAnybaseAfterpoint = document.querySelector('#decimal-to-anybase-afterpoint')
    let afterPointdiv = document.querySelector('#after-decimal')

    let afterValue = (Number(newValue) - parseInt(newValue)).toFixed(3)
    if (afterValue > 0) {
      finalAnswer += '.';
      afterPointdiv.style.display = 'block'
    }
    else afterPointdiv.style.display = 'none'

    console.log('after value ', afterValue);
    let temp = ''
    for (let i = 1; i <= 5; i++) {
      if (afterValue <= 0) break;
      temp = afterValue * to;
      decimalAnybaseAfterpoint.innerHTML += `<p>${afterValue} x ${to} = ${temp} = <span>${parseInt(temp)}</span></p>`
      afterValue = (temp - parseInt(temp)).toFixed(3)
      finalAnswer += `${parseInt(temp)}`
    }

    // 

    document.querySelector('#decimal-anybase-final-ans').innerHTML = finalAnswer;
  }

}

function conversionShortcutSummaryFn(value, from, to) {
  //
  let evalConversionShortcutDetailBox = document.querySelector('#eval-conversion-shortcut-detail-box')
  from = Number(from), to = Number(to);

  let output = anyBaseToAnyBaseShortcutFn(value, from, to)
  if (output == null) {
    evalConversionShortcutDetailBox.style.display = 'none';
    return;
  }
  let { result, htmlRenderValueArr } = output


  let conversionShortcutTable = document.querySelector('#conversion-shortcut-table')
  let conversionShortcutTableTemplate = document.querySelector('#conversion-shortcut-table-template')
  let conversionTableBody = conversionShortcutTable.querySelector('tbody')

  let clone = '', cloneSubPart = '';

  htmlRenderValueArr.forEach((obj) => {
    clone = conversionShortcutTableTemplate.content.cloneNode(true);
    cloneSubPart = clone.querySelectorAll('td');

    cloneSubPart[0].innerHTML = `${obj.key}`;
    cloneSubPart[1].innerHTML = `${obj.value}`;
    conversionTableBody.append(clone);
  })


  let shortcutAnybaseFinalAns = document.querySelector('#shortcut-anybase-final-ans')
  shortcutAnybaseFinalAns.innerHTML = result;

  evalConversionShortcutDetailBox.style.display = 'block';
}

function utilsConversionFn_1() {
  /* This fn is called for geting values (from, to , value) & performing checks on it. */

  let evalConversionFrom =
    document.querySelector(".eval-conversion-from")?.innerHTML || "";
  let evalConversionTo =
    document.querySelector(".eval-conversion-to")?.innerHTML || "";
  let fromInput =
    document.querySelector(".eval-conversion-from-input").value || "";
  let toInput =
    document.querySelector(".eval-conversion-to-input")?.value || "";
  let mainVal =
    document.querySelector(".eval-conversion-main-val").innerHTML || "";

  // checking value

  if (evalConversionFrom == "" && fromInput?.toString() == "") {
    alert("Please enter from base value");
    return null;
  }
  if (evalConversionTo == "" && toInput?.toString() == "") {
    alert("Please enter to base value");
    return null;
  }
  if (mainVal.trim() == "") {
    alert("Please enter value");
    return null;
  }

  // core logic

  let baseObj = {
    Binary: 2,
    Decimal: 10,
    Hexadecimal: 16,
    Octal: 8,
    Grey: null,
  };

  let tempFromBase, tempToBase;

  if (fromInput != "") tempFromBase = Number(fromInput);
  else {
    tempFromBase = baseObj[evalConversionFrom];
  }

  if (toInput != "") tempToBase = Number(toInput);
  else {
    tempToBase = baseObj[evalConversionTo];
  }

  return {
    value: mainVal,
    from: tempFromBase,
    to: tempToBase,
  };
}

// used to toggle display flex & none
function displayToggleFn(flage, container) {
  if (flage) container.style.display = "flex";
  else container.style.display = "none";
  return !flage;
}

//************************************** complement era **************** *//

let compFindBtn = document.querySelector('#comp-find-btn');

compFindBtn.addEventListener('click', () => {

  let output = utilsComplementFn_1();
  if (!output) return;
  let { value, base } = output;

  let FCB_Checker_Flage = CB_Checker('comple', { value, base }, 'FCB')
  if (!FCB_Checker_Flage) {
    console.log('Running....')
    compEvaluateFn(value, base) // evaluate 
  }

})

let compExplainBtn = document.querySelector('#comp-explain-btn');
let compExplainDisplayFlage = true;
compExplainBtn.addEventListener('click', () => {

  let output = utilsComplementFn_1();
  if (!output) return;
  let { value, base } = output;
  let compdetailBoxContainer = document.querySelector('#comp-detail-box-container');

  let ECB_Checker_Flage = CB_Checker('comple', { value, base }, 'ECB')
  if (!ECB_Checker_Flage) {
    console.log('Running....');
    compEvaluateFn(value, base) // evaluate
    complementOtherComplementSummaryFn(value, base)
    complementExplanationSummaryFn(value, base)
  }
  compExplainDisplayFlage = displayToggleFn(compExplainDisplayFlage, compdetailBoxContainer)
})

function compEvaluateFn(value, base) {
  let output = complementFn(value, base)
  let compAns = document.querySelector('#comp-final-answer-para')
  compAns.innerText = output[0] || ''
}

function complementOtherComplementSummaryFn(value, base) {
  let clone = document.querySelector('#val-container-templet').content.cloneNode(true);
  base = Number(base)

  let output = complementFn(value, base)
  clone.querySelector('label').innerHTML = `${base}'s Complement`
  clone.querySelector('p').innerHTML = output[1] || ''

  let container = document.querySelector('#complement-other-complement-box')
  htmlAppendTreeClear([container]) // 
  container.append(clone)
}

function complementExplanationSummaryFn(value, base) {

  let paras = document.querySelector('#complement-explanation-box').querySelectorAll('.manupulation-para')
  let para_2 = document.querySelectorAll('.manupulation-para-2')

  for (let i = 0; i < para_2.length; i++) {
    para_2[i].remove();
  }

  htmlAppendTreeClear(paras) // 

  let n = Number(base), k = value.trim().length, x = value;

  let output = complementFn(value, base)
  let idx = 0;
  paras[idx++].innerHTML = `n=${n}, k=${k}, x=${x}`

  paras[idx++].innerHTML = `${base - 1}'s Complement`

  if (base == 10) {
    paras[idx++].innerHTML = `(${n}<sup>${k}</sup>-1) - ${x} = ${output[0]}`
  }
  else {
    let baseForm = anyBaseToAnyBase(`${Math.pow(n, k) - 1}`, 10, base)
    paras[idx].innerHTML = `(${n}<sup>${k}</sup>-1) = ${Math.pow(n, k) - 1} = ${baseForm}`
    let pTage = document.createElement('p')
    pTage.classList.add('manupulation-para-2')
    pTage.innerText = `${baseForm} - ${x} = ${output[0]}`
    paras[idx++].insertAdjacentElement('afterend', pTage)
  }

  paras[idx++].innerHTML = `${base}'s Complement`

  if (base == 10) {
    paras[idx++].innerHTML = `${n}<sup>${k}</sup> - ${x} = ${output[1]}`
  }
  else {
    let baseForm = anyBaseToAnyBase(`${Math.pow(n, k)}`, 10, base)
    paras[idx].innerHTML = `${n}<sup>${k}</sup> = ${Math.pow(n, k)} = ${baseForm}`
    let pTage = document.createElement('p')
    pTage.classList.add('manupulation-para-2')
    pTage.innerText = `${baseForm} - ${x} = ${output[1]}`
    paras[idx].insertAdjacentElement("afterend", pTage)
  }

}

function utilsComplementFn_1() {
  //  here we check value and base input are correct or not 
  let value = document.querySelector('#comp-input-1')?.innerText || ''
  let base = document.querySelector('#comp-input-2')?.value || ''

  console.log(value, base);
  if (value.trim() == '') {
    alert("Please enter value");
    return null
  }
  if (base.trim() == '') {
    alert("Please enter base value");
    return null
  }

  return { value, base }
}

// **************************** calculation era ********************************//

let calcClearBtn = document.querySelector('#calc-clear-btn')
let calcSwapBtn = document.querySelector('.calc-swap')
let calcCalculateBtn = document.querySelector('#calc-calculate-btn')
let calcExplainBtn = document.querySelector('#calc-explain-btn')
let finalAnswerPara = document.querySelector('#calc-final-answer-para')
let calcDetailBoxContainer = document.querySelector('#calc-detail-box-container')
let calcExplainDisplayFlage = true;
let arithmeticOutputObj = {}, bcdOutputObj = {}  // global variables

calcCalculateBtn.addEventListener('click', () => {
  let output = utilsCalculationFn_1();
  if (!output) return;
  let { val_1, val_2, calcOperator, calcFunction } = output;
  let FCB_Checker_Flage = CB_Checker('calcu', { val_1, val_2, calcOperator, calcFunction }, 'FCB')

  if (!FCB_Checker_Flage) {
    console.log('Running....');
    if (calcFunction?.toLowerCase() == 'auto') {
      finalAnswerPara.innerText = calculationAutoHandle(val_1, val_2, calcOperator); // 
    }
    else if (calcFunction?.toLowerCase() == 'bcd') {
      finalAnswerPara.innerText = calculationBcdHandle(val_1, val_2, calcOperator);
    }
    else if (calcFunction?.toLowerCase() == 'complement') {
      finalAnswerPara.innerText = calculationComplementHandle(val_1, val_2, calcOperator);
    }
  }

});

calcExplainBtn.addEventListener('click', () => {


  let output = utilsCalculationFn_1();
  if (!output) return;
  let { val_1, val_2, calcOperator, calcFunction } = output;

  let ECB_Checker_Flage = CB_Checker('calcu', { val_1, val_2, calcOperator, calcFunction }, 'ECB')
  if (!ECB_Checker_Flage) {
    console.log('Running...');
    if (calcFunction?.toLowerCase() == 'auto') {
      finalAnswerPara.innerText = calculationAutoHandle(val_1, val_2, calcOperator); //

      calculationOthercalculationSummaryFn(val_1, val_2, calcOperator)
      calculateExplainationSummaryFn(val_1, val_2)
    }
    else if (calcFunction?.toLowerCase() == 'bcd') {
      finalAnswerPara.innerText = calculationBcdHandle(val_1, val_2, calcOperator); // 

      calculateOthercalculationBcdSummaryFn(val_1, val_2, calcOperator)
      calculationExplainationBcdSummaryFn(val_1, val_2)
    }
    else if (calcFunction?.toLowerCase() == 'complement') {
      finalAnswerPara.innerText = calculationComplementHandle(val_1, val_2, calcOperator); // 

      calculationExplainationComplementSummaryFn(val_1, val_2)
    }
  }

  calcExplainDisplayFlage = displayToggleFn(calcExplainDisplayFlage, calcDetailBoxContainer)

})

calcClearBtn.addEventListener('click', () => {
  document.querySelector('#calc-value-1').innerText = ''
  document.querySelector('#calc-value-2').innerText = ''
  document.querySelector('#calc-operator').innerHTML = '+'
  document.querySelector('#calc-function').innerHTML = 'Auto'
  calcExplainDisplayFlage = displayToggleFn(false, calcDetailBoxContainer)
})

calcSwapBtn.addEventListener('click', () => {
  let temp = document.querySelector('#calc-value-1')?.innerText || ''
  document.querySelector('#calc-value-1').innerText = document.querySelector('#calc-value-2')?.innerText || ''
  document.querySelector('#calc-value-2').innerText = temp
  finalAnswerPara.innerText = ''
})

// calculation function list 

function utilsCalculationFn_1() {

  let val_1 = document.querySelector('#calc-value-1')?.innerText || ''
  let val_2 = document.querySelector('#calc-value-2')?.innerText || ''
  let calcOperator = document.querySelector('#calc-operator')?.innerHTML || ''
  let calcFunction = document.querySelector('#calc-function')?.innerHTML || ''

  if (
    [val_1, val_2, calcOperator, calcFunction]
      .some((item) => {
        if (item?.trim() == '') {
          alert("Please enter value");
          return true
        }
      }))
    return null; // empty values 

  return { val_1, val_2, calcOperator, calcFunction }

}

function calculationAutoHandle(val_1, val_2, calcOperator) {
  let temp = ''
  if (calcOperator == '+') {
    temp = binaryAdditionFn(val_1, val_2)
  }
  else if (calcOperator == '-') {
    temp = binarySubtractionFn(val_1, val_2)
  }
  else if (calcOperator == '*') {
    temp = binaryMultiplicationFn(val_1, val_2)
  }
  else if (calcOperator == '/') {
    temp = binaryDivisionFn(val_1, val_2)
  }
  arithmeticOutputObj[calcOperator] = temp;
  return temp;
}

function calculationBcdHandle(val_1, val_2, calcOperator) {
  let ans = ''
  if (calcOperator == '+') {
    ans = bcdAdditionFn(val_1, val_2);
  } else if (calcOperator == '-') {
    ans = bcdSubtractionFn(val_1, val_2);
  }
  bcdOutputObj[calcOperator] = ans || '';
  if (ans) return ans;
  alert(`${calcOperator == '*' ? 'Multiplication' : 'Division'} isn't performed on BCD`)
  return null;
}

function calculationComplementHandle(val_1, val_2, calcOperator) {
  // 
  if (calcOperator == '-') {
    console.log('544', val_1, val_2, calcOperator);
    return subtractByComplementFn(val_1, val_2);
  }
  alert(`Only subtraction can be performed using complement`)
  return null;
}


// html rendering function 

function calculationOthercalculationSummaryFn(val_1, val_2, calcOperator) {

  let operatorArr = ['+', '-', '*', '/'];
  let detailBoxTemplate = document.querySelector('#val-container-templet')
  let calculationSummaryContainer = document.querySelector('#calc-other-calculation-summary-container');
  htmlAppendTreeClear([calculationSummaryContainer]) // clear all childnode 
  operatorArr.forEach((oprt) => {
    if (oprt != calcOperator) {
      let clone = detailBoxTemplate.content.cloneNode(true);
      let temp = calculationAutoHandle(val_1, val_2, oprt);
      clone.querySelector('label').innerHTML = `${arithmeticOperatorChecker(oprt)}`
      clone.querySelector('p').innerHTML = temp || ''
      calculationSummaryContainer.appendChild(clone)
    }
  })

}

function calculateExplainationSummaryFn(val_1, val_2) {
  //
  let explainAnswerForm_1 = document.querySelector('#explain-answer-form-1')
  let calcExplainSummaryContainer = document.querySelector('#calc-explain-summary-container')
  htmlAppendTreeClear([calcExplainSummaryContainer]) // clear all childnode

  let operatorArr = ['+', '-', '*', '/']

  operatorArr.forEach((optr) => {
    let clone = explainAnswerForm_1.content.cloneNode(true)
    clone.querySelector('h2').innerText = arithmeticOperatorChecker(optr)
    clone.querySelector('p').innerText = `${val_1} ${optr} ${val_2} = ${arithmeticOutputObj[optr]}`
    calcExplainSummaryContainer.append(clone)
  })


}

function calculateOthercalculationBcdSummaryFn(val_1, val_2, calcOperator) {
  //  
  let clone = document.querySelector('#val-container-templet').content.cloneNode(true);
  let calculationSummaryContainer = document.querySelector('#calc-other-calculation-summary-container');
  htmlAppendTreeClear([calculationSummaryContainer]) // clear all childnode
  let ans = ''
  if (calcOperator == '+') {
    clone.querySelector('label').innerHTML = 'Subtraction'
    ans = bcdSubtractionFn(val_1, val_2)
    bcdOutputObj['-'] = ans || '';
  }
  else {
    clone.querySelector('label').innerHTML = 'Addition'
    ans = bcdAdditionFn(val_1, val_2)
    bcdOutputObj['+'] = ans || '';
  }
  clone.querySelector('p').innerHTML = ans || ''
  calculationSummaryContainer.append(clone)
}

function calculationExplainationBcdSummaryFn(val_1, val_2) {
  // 
  let checkDecimalFlage = false;

  checkDecimalFlage = checkDecimalOrBcdUtFn(val_1)
  if (!checkDecimalFlage) checkDecimalFlage = checkDecimalOrBcdUtFn(val_2);

  let template = document.querySelector('#explain-answer-form-1');
  let explainSummaryContainer = document.querySelector('#calc-explain-summary-container')
  htmlAppendTreeClear([explainSummaryContainer]) // clear all childnode
  let val_1_Bcd = '', val_2_Bcd = ''
  if (checkDecimalFlage) {
    val_1_Bcd = anyBaseToBcdFn(val_1, 10)
    val_2_Bcd = anyBaseToBcdFn(val_2, 10)
  }


  let clone = '', tempCalcOperator = '+'
  function x() {
    clone = template.content.cloneNode(true)
    let cloneH2 = clone.querySelector('h2')
    cloneH2.innerText = arithmeticOperatorChecker(tempCalcOperator);
    clone.querySelector('p').innerText = ` ${val_1_Bcd || val_1} ${tempCalcOperator} ${val_2_Bcd || val_2} =  ${bcdOutputObj[tempCalcOperator]}`

    if (checkDecimalFlage) {
      let p = document.createElement('p')
      p.innerText = `${val_2} = ${val_2_Bcd}`
      cloneH2.insertAdjacentElement('afterEnd', p)

      p = document.createElement('p')
      p.innerText = `${val_1} = ${val_1_Bcd}`
      cloneH2.insertAdjacentElement('afterEnd', p)

    }

    explainSummaryContainer.append(clone)
    tempCalcOperator = '-'
  }

  x();  // addition 
  x(); // subtraction

}

function calculationExplainationComplementSummaryFn(val_1, val_2) {

  let { base1, base2, comp1, comp2, add_1, add_2, carry, carry2, res_1, res_2 } = subtractByComplementFn(val_1, val_2)

  let step1 = `<p><b>Step 1:</b> Find the ${base1}'s complement of the number you are subtracting (subtrahend).</p>`;
  let step2 = `<p><b>Step 2:</b> Add this to the number from which you are taking away (minuend).</p>`
  let step3 = `<p><b>Step 3:</b> ${carry ? 'There is a carry, add it to obtain the result.' : 'There is no carry, recomplement and attach a negative sign to obtain the result.'}</p>`

  let div = document.createElement('div')
  let container = document.querySelector('#calc-explain-summary-container')
  htmlAppendTreeClear([container]) // clear all childnode
  let h2 = document.createElement('h2')
  h2.innerText = `Subtract using ${base1}'s complement`
  div.append(h2)
  for (let i = 1; i <= 6; i++) {
    let p = document.createElement('p')
    if (i % 2 == 1) p.innerHTML = (i == 1 ? step1 : i == 3 ? step2 : step3)
    else {
      if (i == 2) p.innerHTML = `${base1}'s complement of ${val_2} = ${comp1}`
      else if (i == 4) p.innerHTML = `${val_1} + ${comp1} = <span id='calc-carry' >${carry}</span>${add_1}`
      else p.innerHTML = `${carry ? `${carry} + ${add_1}` : 'Recomplement'} = ${res_1}`
    }
    div.append(p)
  }

  h2 = document.createElement('h2')
  h2.innerText = `Subtract using ${base2}'s complement`

  div.append(h2)
  step3 = `<p><b>Step 3:</b> ${carry2 ? 'There is a carry, then drop it and the answer is positive.' : 'There is no carry so recomplement it and a negative sign is attached to it to obtain the final result.'} </p>`

  for (let i = 1; i <= 6; i++) {
    let p = document.createElement('p')
    if (i % 2 == 1) p.innerHTML = (i == 1 ? step1 : i == 3 ? step2 : step3)
    else {
      if (i == 2) p.innerHTML = `${base2}'s complement of ${val_2} = ${comp2}`
      else if (i == 4) p.innerHTML = `${val_1} + ${comp2} = <span id='calc-carry'>${carry2}</span>${add_2}`
      else p.innerHTML = `${carry2 ? `Drop this carry ` : 'Recomplement'} = ${res_2}`
    }
    div.append(p)
  }

  container.append(div)
}

function htmlTemplate(label, parent, child = null) {
  if (label.trim() == '') return null;
  let clone = document.querySelector('#detail-box-template').content.cloneNode(true);
  clone.querySelector('p').innerText = label;
  if (child) clone.querySelector('.detail-summary-box').append(child)
  parent.appendChild(clone);
}

function arithmeticOperatorChecker(operator) {
  if (operator == '+') return 'Addition';
  if (operator == '-') return 'Subtraction';
  if (operator == '*') return 'Multiplication';
  if (operator == '/') return 'Division';
  return null;
}

function htmlAppendTreeClear(treeNode = []) {
  for (let i = 0; i < treeNode.length; i++) {
    treeNode[i].innerHTML = '';
  }
}