let hamContainer = document.getElementById("ham-container");
let hamOne = document.getElementById("ham-one");
let hamTwo = document.getElementById("ham-two");
let hamThree = document.getElementById("ham-three");

//  ham menu code

hamContainer.addEventListener("click", () => {
  hamThree.classList.toggle("ham-three-after");
  hamTwo.classList.toggle("ham-two-after");
  hamOne.classList.toggle("ham-one-after");

  document.querySelector(".nav-list").classList.toggle("ham-nav-list");
});

// select container

let selectIcon = document.querySelectorAll(".select-icon");
let selectList = document.querySelectorAll(".select-list");

// select code

// select icon rotated code

for (let i = 0; i < selectIcon.length; i++) {
  selectIcon[i].addEventListener("click", () => {
    selectIcon[i].classList.toggle("select-icon-rotation");
  });
}

for (let i = 0; i < selectIcon.length; i++) {
  selectIcon[i].addEventListener("click", () => {
    selectList[i].classList.toggle("select-list-after");
  });
}

for (let i = 0; i < selectList.length; i++) {
  selectList[i].addEventListener("click", (e) => {
    // console.log(e.target.id);
    let id = e.target.id;

    // console.log(document.getElementsByClassName("para-selection"));

    let paraSelection = document.getElementsByClassName("para-selection")[i];

    let inputSelection = document.getElementsByClassName("input-selection")[i];

    if (id == "input-value") {
      paraSelection.style.display = "none";
      inputSelection.style.display = "flex";
    } else {
      paraSelection.innerText = e.target.innerText;
      inputSelection.style.display = "none";
      paraSelection.style.display = "flex";
      inputSelection.value = "";
    }

    selectList[i].classList.toggle("select-list-after");
  });
}

let optionArr = document.querySelector(".options-inner-container").children;

// console.log(optionArr);

let prevDisplayContainer = document.querySelector("#conversion");
let currentDisplayContainer = document.querySelector("#conversion");

for (let i = 0; i < optionArr.length; i++) {
  optionArr[i].addEventListener("click", (e) => {
    let tempDisplayContainer = document.getElementById(
      optionArr[i].innerText.toLowerCase()
    );

    prevDisplayContainer = currentDisplayContainer;
    currentDisplayContainer = tempDisplayContainer;
    prevDisplayContainer.style.display = "none";
    currentDisplayContainer.style.display = "block";
  });
}

// code for custom select elements

let customSelectContainer = document.querySelectorAll(
  ".custom-select-container"
);
let customSelectDisplayContainer = document.querySelectorAll(
  ".custom-select-display-container"
);
let customSelectValues = document.querySelectorAll(".custom-select-values");

for (let i = 0; i < customSelectValues.length; i++) {
  let tempCustomSelectValue = customSelectValues[i].children;
  for (let j = 0; j < tempCustomSelectValue.length; j++) {
    tempCustomSelectValue[j].addEventListener("click", (e) => {
      customSelectDisplayContainer[i].innerText =
        tempCustomSelectValue[j].innerText;
      customSelectValues[i].style.display = "none";
    });
  }
}

for (let i = 0; i < customSelectDisplayContainer.length; i++) {
  customSelectDisplayContainer[i].addEventListener("click", () => {
    customSelectValues[i].style.display =
      customSelectValues[i].style.display == "block" ? "none" : "block";
  });
}

// keyboard design

{
  let keyboard = document.getElementById("keyboard");
  let keyboardSvg = document.getElementById("keyboard-svg");
  // let keyboardText = document.querySelectorAll(".keyboard-text");
  // for (let i=1;i<=26;i++) {

  // console.log(keyboard, keyboardSvg);

  // let words = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // let words = "123456789QWERTYUIOPASDFGHJK↑LZXCVBNM+-*÷.,'()0&$―^Σπ=@";

  let words = "(),+-―Σπ=";

  let tempKeyboardContainer = document.createElement("div");
  tempKeyboardContainer.className = "keyboard-each-row";

  // for (let i = 0; i < words.length; i++) {
  //   let temp = keyboardSvg.cloneNode(true);

  //   if (words[i] === "&") temp.childNodes[3].innerHTML = "00";
  //   else if (words[i] === "$") temp.childNodes[3].innerHTML = "11";
  //   else temp.childNodes[3].innerHTML = words[i];
  //   if (words[i] === "@") {
  //     let keyboardEnterSvg = document.getElementById("keyboard-enter-svg");
  //     temp = keyboardEnterSvg.cloneNode(true);
  //   }
  //   tempKeyboardContainer.appendChild(temp);
  //   if (((i + 1) % 9 == 0 && i != 0) || i == words.length - 1) {
  //     keyboard.appendChild(tempKeyboardContainer);
  //     tempKeyboardContainer = document.createElement("div");
  //     tempKeyboardContainer.className = "keyboard-each-row";
  //   }
  // }

  let keyboardEachrow = document.querySelectorAll(".keyboard-each-row");

  // console.log(keyboardEachrow);

  // for (let i = 0; i < keyboardEachrow.length; i++) {
  //   for (let j = 0; j < keyboardEachrow[i].children.length; j++) {
  //     keyboardEachrow[i].addEventListener("click", (e) => {
  //       console.log(e.target.innerHTML);
  //     })
  //   }
  // }

  // let paragraph = document.getElementById('paragraph');

  // keyboard.addEventListener("click", (e) => {
  //   console.log(e.target.innerHTML);

  //   paragraph.innerHTML = e.target.innerHTML;
  // });
}

//*** key board touch abilty  */

let keyboardEachRow1 = document.querySelector(".keyboard-each-row");



let answerExplanationPara = document.querySelector(".answer-explanation-para");

