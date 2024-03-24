let swapSvg = document.querySelector("#swap");
console.log(swapSvg);

swapSvg.addEventListener("click", () => {
  console.log("swaping...");

  let from = document.querySelector(".eval-conversion-from");
  let fromInput = document.querySelector(".eval-conversion-from-input");
  let to = document.querySelector(".eval-conversion-to");
  let toInput = document.querySelector(".eval-conversion-to-input");

  let fromFlage = false,
    toFlage = false;

  if (fromInput?.value != "") fromFlage = true;
  if (toInput?.value != "") toFlage = true;

  if (fromFlage && toFlage) {
    let temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
  } else if (fromFlage && !toFlage) {
    let temp = fromInput.value;
    from.innerHTML = to.innerHTML;
    toInput.value = temp;

    fromInput.value = "";
    to.innerHTML = "";

    // style
    to.style.display = "none";
    toInput.style.display = "flex";
    fromInput.style.display = "none";
    from.style.display = "flex";
  } else if (!fromFlage && toFlage) {
    let temp = from?.innerHTML;
    fromInput.value = toInput.value;
    to.innerHTML = temp;

    toInput.value = "";
    from.innerHTML = "";

    // style
    to.style.display = "flex";
    toInput.style.display = "none";
    fromInput.style.display = "flex";
    from.style.display = "none";
  } else {
    let temp = from.innerHTML;
    from.innerHTML = to.innerHTML;
    to.innerHTML = temp;
  }
});

// details box functioning

function detailBox() {
  let detailBtn = document.querySelectorAll(".detail-btn");
  let detailSummaryBox = document.querySelectorAll(".detail-summary-box");

  console.log("funciton", detailBtn);

  for (let i = 0; i < detailBtn.length; i++) {
    detailBtn[i].addEventListener("click", () => {
      detailBtn[i].innerHTML = detailBtn[i].innerHTML == "+" ? "-" : "+";
      detailSummaryBox[i].classList.toggle("summary-active");
    });
  }
}

detailBox();
