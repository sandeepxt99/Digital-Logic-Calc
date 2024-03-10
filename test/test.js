function keyboardHtml() {
  let box = document.querySelectorAll(".box");
  let right = document.querySelector("#right");
  let left = document.querySelector("#left");

  let slideIdx = 0;
  // console.log(box[2]);

  function rightFn() {
    box[slideIdx].style.transform = `translateX(0px)`;
    if (slideIdx < box.length - 1) slideIdx++;
    else slideIdx = 0;
    box[slideIdx].style.transform = `translateX(-${200 * slideIdx}px)`;
  }

  function leftFn() {
    box[slideIdx].style.transform = `translateX(0px)`;

    if (slideIdx > 0) slideIdx--;
    else slideIdx = box.length - 1;

    box[slideIdx].style.transform = `translateX(-${200 * slideIdx}px)`;
  }

  right.addEventListener("click", rightFn);
  left.addEventListener("click", leftFn);

  let imgContainer = document.querySelector("#img-container");

  // console.log(imgContainer);

  let touchStart = 0,
    touchEnd = 0,
    width = imgContainer.offsetLeft,
    height = imgContainer.offsetTop;

  let clientX1, clientX2, clientY1, clientY2;

  imgContainer.addEventListener(
    "touchstart",
    (e) => {
      console.clear();
      console.log("start : ", e.touches[0].clientX);
      // console.log("start : ", e);
      // touchStart = e.touches[0].clientX;
      clientX1 = parseInt(e.touches[0].clientX);
      clientY1 = parseInt(e.touches[0].clientY);
      // touchStart = parseInt(touchStart) - parseInt(imgContainer.offsetLeft);
    },
    { passive: true }
  );

  imgContainer.addEventListener(
    "touchend",
    (e) => {
      // console.clear() ;
      console.log("end : ", e.changedTouches[0].clientX);
      //touchEnd = e.changedTouches[0].clientX;
      // touchEnd = parseInt(touchEnd) - parseInt(imgContainer.offsetLeft);
      clientX2 = parseInt(e.changedTouches[0].clientX);
      clientY2 = parseInt(e.changedTouches[0].clientY);

      // para.innerHTML = `Start: ${touchStart} & End: ${touchEnd} `;

      console.log("events", { clientX1, clientY1, clientX2, clientY2 });

      // console.log(
      //   parseIntparseInt(imgContainer.offsetTop),
      //   parseInt(touchStart) - parseInt(imgContainer.offsetLeft)
      // );

      if (Math.abs(clientX2 - clientX1) > Math.abs(clientY1 - clientY1)) {
        console.log("horozontal");
        if (clientX2 > clientX1) {
          console.log("left -> right");
          leftFn();
        } else {
          console.log("right -> left");
          rightFn();
        }
      } else {
        console.log("vertical");
      }
    },
    { passive: true }
  );

  // imgContainer.addEventListener(
  //   "touchmove",
  //   (e) => {
  //     console.log("final diff", touchStart, touchEnd);
  //     para.innerHTML = `Start: ${touchStart} & End: ${touchEnd}`;
  //   },
  //   { passive: true }
  // );

  let para = document.querySelector("#para");
}

//  details box code

function detailBox() {
  let detailBtn = document.querySelectorAll(".detail-btn");
  let detailSummaryBox = document.querySelectorAll(".detail-summary-box");

  console.log(detailBtn);

  for (let i = 0; i < detailBtn.length; i++) {
    detailBtn[i].addEventListener("click", () => {
      detailBtn[i].innerHTML = detailBtn[i].innerHTML == "+" ? "-" : "+";
      detailSummaryBox[i].classList.toggle("summary-active");
    });
  }

}
detailBox()


