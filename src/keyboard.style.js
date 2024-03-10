// container
let upperContainer = document.querySelector("#upper-container");
let alphabaticContainer = document.querySelector("#alphabatic-container");
let specialCharContainer = document.querySelector("#spacial-char-container");
// let specialBtnContainer = document.querySelector(
//   "#spacial-btn-container"
// );

let keyboardArr = [upperContainer, alphabaticContainer, specialCharContainer];

// console.log(keyboardArr);

function keyboardContainerSwiper(mainContainer) {
  let touchStartX = 0,
    touchStartY = 0,
    touchEndX = 0,
    touchEndY = 0,
    slideIdx = 0;

  let container = mainContainer.children;

  // console.log(container);

  function cordinateFn(e) {
    let touchX = parseInt(
      e.changedTouches[0].clientX - upperContainer.offsetLeft
    );
    let touchY = parseInt(
      e.changedTouches[0].clientY - upperContainer.offsetTop
    );

    // console.log(touchStartX, touchStartY);
    return {
      touchX,
      touchY,
    };
  }

  function rightSwipeFn() {
    container[slideIdx].style.transform = `translateX(0px)`;
    // container[slideIdx].style.opacity = `0`;
    if (slideIdx < container.length - 1) slideIdx++;
    container[slideIdx].style.transform = `translateX(-${slideIdx * 100}%)`;
    // container[slideIdx].style.opacity = `1`;
  }

  function leftSwipeFn() {
    container[slideIdx].style.transform = `translateX(0px)`;
    // container[slideIdx].style.opacity = `0`;
    if (slideIdx > 0) slideIdx--;
    container[slideIdx].style.transform = `translateX(-${slideIdx * 100}%)`;
    // container[slideIdx].style.opacity = `1`;
  }

  mainContainer.addEventListener(
    "touchstart",
    (e) => {
      let cordinate = cordinateFn(e);

      touchStartX = cordinate.touchX;
      touchStartY = cordinate.touchY;
      // console.log(cordinate);
    },
    { passive: true }
  );

  mainContainer.addEventListener(
    "touchend",
    (e) => {
      let cordinate = cordinateFn(e);
      touchEndX = cordinate.touchX;
      touchEndY = cordinate.touchY;
      // console.log("final", touchStartX, touchEndX, touchStartY, touchEndY);
      findingTouchWay();
    },
    { passive: true }
  );

  function findingTouchWay() {
    if (touchEndX != touchStartX) {
      if (touchEndX > touchStartX) {
        leftSwipeFn();
      } else {
        rightSwipeFn();
      }
    }
  }
}

for (let i = 0; i < keyboardArr.length; i++) {
  keyboardContainerSwiper(keyboardArr[i]);
}

// alphabatic keys

let node = document.querySelector(".node");

// console.log(node, alphabaticContainer.children);

let keyboardAlphabaticStr = "ABCDEFWXYZPQRSMNOIJKLGHTUV";
let keyboardAlphabaticSec = document.querySelector("#alphabatic-sec-1");

for (let i = 0; i < keyboardAlphabaticStr.length; i++) {
  let element = node.cloneNode(true);
  element.children[1].innerHTML = keyboardAlphabaticStr[i];
  keyboardAlphabaticSec.appendChild(element);
  if ((i + 1) % 5 == 0) {
    keyboardAlphabaticSec = document.querySelector(
      `#alphabatic-sec-${(i + 1) / 5 + 1}`
    );
  }
}

// special character keys
let keyboardSpecialCharStr = `()+-=.,'ˉΣπ*÷Φ^`;
let keyboardSpecialCharSec = document.querySelector("#spacial-char-sec-1");

for (let i = 0; i < keyboardSpecialCharStr.length; i++) {
  let element = node.cloneNode(true);
  element.children[1].innerHTML = keyboardSpecialCharStr[i];
  keyboardSpecialCharSec.appendChild(element);
  if ((i + 1) % 5 == 0) {
    keyboardSpecialCharSec = document.querySelector(
      `#spacial-char-sec-${(i + 1) / 5 + 1}`
    );
  }
}

node.style.display = "none";

// function backspaceFn(currInput) {
//   let val = currInput.innerHTML || ''
//   val = val.slice(0, val.length - 1)
//   currInput.innerHTML = val;
//   return;
// }

function backspaceFn(val = "") {
  return val.slice(0, val.length - 1);
}

function capsFn() {
  let alphabaticSvg = document.querySelectorAll("#alphabatic-container svg");
  if (alphabaticSvg[0].children[1].innerHTML == "A") {
    for (let i = 0; i < alphabaticSvg.length; i++) {
      alphabaticSvg[i].children[1].innerHTML =
        keyboardAlphabaticStr[i].toLowerCase();
    }
  } else {
    for (let i = 0; i < alphabaticSvg.length; i++) {
      alphabaticSvg[i].children[1].innerHTML =
        keyboardAlphabaticStr[i].toUpperCase();
    }
  }
}

let capsKey = document.querySelector("#caps");
let backspaceKey = document.querySelector("#backspace");
let capsKeyFlage = false;

capsKey.addEventListener("click", () => capsFn());

// custom input tag

// on click at keys function
let svgs = document.querySelectorAll("#keyboard svg");

let inputTags = document.querySelectorAll(".custom-input");
let currInput = inputTags[0];

for (let i = 0; i < svgs.length; i++) {
  svgs[i].addEventListener("click", (e) => {
    // let val = svgs[i].children[1].innerHTML;
    currInput.children[0].innerHTML += svgs[i].children[1].innerHTML.trim();
    // console.log("addeventlistener", currInput);
  });
}

// console.log(inputTags);
let keyboard = document.querySelector("#keyboard");

for (let i = 0; i < inputTags.length; i++) {
  inputTags[i].addEventListener("click", (e) => {
    currInput = inputTags[i];
    keyboard.classList.toggle("keyboard-focus");
  });
}

// backspace event lisener
backspaceKey.addEventListener("click", () => {
  currInput.children[0].innerHTML = backspaceFn(
    currInput.children[0].innerHTML
  );
});

// document.addEventListener("keydown", (e) => {
//   let keywordsStr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234456789()+-=.,'ˉΣπ*÷Φ^`;
//   if (keywordsStr.includes(e.key)) {
//     currInput.children[0].innerHTML += e.key;
//   }
//   if (e.key == "Backspace") {
//     currInput.children[0].innerHTML = backspaceFn(
//       currInput.children[0].innerHTML
//     );
//   }
// });


export { currInput, inputTags };
