window.onload = pageready;

function pageready() {
  const background = document.getElementById("background");
  const alternative = document.getElementById("alternative");
  const dialog = document.getElementById("dialog");
  const choiceButtons = document.querySelector(".choice");
  const talk = document.getElementById("talk");
  const tarot = document.getElementById("tarot");
  const guess = document.getElementsByClassName("guess")[0];
  const luckyNumber = document.getElementsByClassName("luckyNumber")[0];
  const number = document.getElementById("number");
  const lucky = document.getElementById("lucky");
  const bgcard = document.getElementsByClassName("bgcard")[0];
  const imgArray = bgcard.getElementsByTagName("img");
  console.log(imgArray);
  const exit = document.getElementById("exit");

  // Hide the dialog and choice buttons initially
  dialog.style.display = "none";
  choiceButtons.style.display = "none";
  /*luckyNumber.style.display = "none";
  bgcard.style.display = "none";
  exit.style.display = "none";*/

  // Show the dialog after 3 seconds
  setTimeout(() => {
    dialog.style.display = "block";
    // Trigger the typing animation
    startTypingAnimation();
  }, 3000);

  // Show the choice buttons after 6.8 seconds
  setTimeout(() => {
    choiceButtons.style.display = "flex";
    choiceButtons.style.justifyContent = "space-evenly";
  }, 6800);

  // Function to start the typing animation
  function startTypingAnimation() {
    talk.innerHTML = "一緒に遊びませんか?";
    applyTypingAnimation();
  }

  // Function to restart the typing animation
  function restartTypingAnimation() {
    // Remove the current animation
    talk.style.animation = "none";
    // Trigger a reflow to apply the removal (important step)
    void talk.offsetWidth;
    // Apply the animation again
    applyTypingAnimation();
  }

  // Function to apply the typing animation property
  function applyTypingAnimation() {
    talk.style.animation = "typing 4.8s steps(var(--count)) forwards";
  }

  // Add a click event listener to the document, calling the toggleImages function
  const yesButton = document.querySelector(".choice button:nth-child(1)");
  const noButton = document.querySelector(".choice button:nth-child(2)");

  yesButton.addEventListener("click", () => {
    dialog.style.display = "none";
    luckyNumber.style.display = "block";
    bgcard.style.display = "block";
    exit.style.display = "block";
    tarot.style.display = "none";

    let myNumber; // Declare myNumber outside the loop

    for (let i = 0; i < imgArray.length; i++) {
      imgArray[i].addEventListener("click", () => {
        // Remove any existing 'trans' class from other cards
        for (let j = 0; j < imgArray.length; j++) {
          if (j !== i) {
            imgArray[j].classList.remove("trans");
          }
        }

        // Toggle 'trans' class on the clicked card
        imgArray[i].classList.toggle("trans");

        // Generate a new random number for the next attempt
        myNumber = Math.floor(Math.random() * 21) + 1;
        if (guess.classList.contains("show-details")) {
          // If details are currently shown, switch to card
          guess.classList.remove("show-details");
        } else {
          // If card is currently shown or it's the initial state, switch to details
          guess.classList.add("show-details");
        }
        tarot.style.display = "none";
      });

      imgArray[i].addEventListener("transitionend", function () {
        imgArray[i].style.display = "none";
        tarot.style.display = "block";
      });
    }

    var theNumber = Math.floor(Math.random() * 21) + 1;
    lucky.innerHTML = theNumber;

    guess.addEventListener("click", () => {
      // Toggle the class to switch between card and details
      if (guess.classList.contains("show-details")) {
        // If details are currently shown, switch to card
        guess.classList.remove("show-details");
      } else {
        // If card is currently shown or it's the initial state, switch to details
        guess.classList.add("show-details");

        // Display 'myNumber' only when details are shown
        number.innerHTML = myNumber;
        console.log(myNumber);
        if (myNumber === theNumber) {
          alert("Winner!");
        }
      }
    });
    exit.addEventListener("click", () => {
      tarot.style.display = "none";
      luckyNumber.style.display = "none";
      bgcard.style.display = "none";
      exit.style.display = "none";
      background.style.display = "none";
      alternative.style.display = "block";
      dialog.style.display = "block";
      choiceButtons.style.display = "none";
      talk.innerHTML = "それではまた次回～";
      restartTypingAnimation();
    });
  });

  noButton.addEventListener("click", () => {
    talk.innerHTML = "それではまた次回～";
    restartTypingAnimation();
    choiceButtons.style.display = "none";
    background.style.display = "none";
    alternative.style.display = "block";
  });
}
