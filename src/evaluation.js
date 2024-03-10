import { currInput, inputTags } from "./keyboard.style.js";
import { anyBaseToAnyBase } from "../backendFn/function.js";

//
let evalConversionConvertBtn = document.querySelector(
  ".eval-conversion-convert-btn"
);

function conversionEvaluationFn() {
  console.log("output is printing...");
  evalConversionConvertBtn.addEventListener("click", () => {
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
    let conversionAnswer = document.querySelector(".eval-conversion-answer");

    // checking value

    if (evalConversionFrom == "" && fromInput?.toString() == "")
      return alert("Please enter from base value");
    if (evalConversionTo == "" && toInput?.toString() == "")
      return alert("Please enter to base value");
    if (mainVal.trim() == "") return alert("Please enter value");

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

    let result = anyBaseToAnyBase(mainVal, tempFromBase, tempToBase);

    conversionAnswer.innerHTML = result;

    // freeup memory

    document.querySelector(".eval-conversion-from-input").value = "";
    document.querySelector(".eval-conversion-to-input").value = "";

    console.log(document.querySelector('.val-container-templet'))
  });
}

conversionEvaluationFn();



function x(val, from, to) {
  let baseArr = [2, 8, 10, 16]

  for (let i = 0; i < baseArr.length; i++) {
    if (baseArr[i] != val) {
      let tempval = anyBaseToAnyBase(val, from, to)
    }
  }


}