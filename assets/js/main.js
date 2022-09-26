// Get a list of lights
const lights = document.querySelectorAll('.light');
let endGame = false; // set the end of game variable to false on load;

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {
  // run the game once loaded
  let startButton = document.getElementById('start');
  startButton.addEventListener('click', function () {
    endGame = false; // reset the end game variable
    resetScore(); // reset the score 
    lightOn();
  });

  // Add event listeners to each light
  for (let light of lights) {
    light.addEventListener('click', function () {
      // Call the function to check if score should be incremented on click
      if (light.classList.contains("light_on")) {
        addScore(light);
        light.classList.remove('light_on');
      } else {
        // When a red light is hit, end the game
        endGame = true;
        // Show on screen message
        alertModal();
      }
    });
  }
});

/* 
 * Scoring function increments score if class is equal to light_on when clicked
 */
function addScore() {
  let currentScore = document.getElementById('score').innerHTML;
  currentScore++;
  document.getElementById('score').innerHTML = currentScore;
}

/*
 * Function to set score to zero again
 */
function resetScore() {
  let currentScore = document.getElementById('score').innerHTML;
  currentScore = 0;
  document.getElementById('score').innerHTML = currentScore;
}

/*
 * Timer function used to randomise when the lights change from red to green between 0.5 and 2 seconds
 * on hard mode, 1 second and 3 seconds on easy mode.
 */
let timer = 0;
let timeOut = 0;

function lightTimer() {
  // Syntax for getting checked radio button used from stack overflow 
  // https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
  let gameMode = document.querySelector('input[name="game_mode"]:checked').value;
  // If game mode indicator is set to easy, return between 1000ms and 3000ms to the timeout function
  if (gameMode == "easy") {
    timer = Math.random() * 3000;
    if (timer <= 1000) {
     timer = 1000;
    }
    return timer;
  // If game mode indicator is set to hard, return between 500ms and 2000ms to the timeout function
  } else if (gameMode == "hard") {
    timer = Math.random() * 2000;
    if (timer <= 500) {
     timer = 500;
    }
    return timer;
  } else {
    window.alert("Error, Game mode not set");
  }
}

/*
 * Function to select a random light and switch the class to 'light on' then remove it again
 * after the specified time from lightTimer function
 */
function lightOn() {
  // check if the endGame variable has been triggered by a red light
  if (!endGame) {
    // Get the number of elements with class light and generate a random number from this
    let lightNumber = Math.floor(Math.random() * lights.length);
    let activeLight = lights[lightNumber];
    activeLight.classList.add('light_on');

    // The timeout feature was researched on StackOverflow - see link in credits
    // Turn light off again
    setTimeout(function () {
      timeOut = lightTimer();
      lightOff(activeLight);
    }, timeOut);
  }
}

/*
 * Function to remove the light on status and re run the game sequence
 */
function lightOff(activeLight) {
  activeLight.classList.remove('light_on');
  lightOn();
}

/*
 * EXTERNAL CODE USED FROM https://www.w3schools.com/howto/howto_css_modals.asp
 */
// Get the modal
let modal = document.getElementById("rules_modal");

// Get the button that opens the modal
let rules = document.getElementById("rules");

// Get the <span> element that closes the modal
let span = document.getElementById("close_rules");

// When the user clicks on the button, open the modal
rules.addEventListener('click', function () {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function () {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

/*
 * Alert function for end of game
 */
function alertModal() {
  //Set modal message to current score
  let finalScore = document.getElementById('score').innerHTML;
  let alertMessage = `Oh no you hit a red light. Final score ${finalScore}`;
  document.getElementById('alert_content').innerHTML = alertMessage;

  // Get the modal
  let lightModal = document.getElementById("light_modal");

  // Get the <span> element that closes the modal
  let lightSpan = document.getElementById("close_light");

  // Show the modal when the function is called
    lightModal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  lightSpan.addEventListener('click', function () {
    lightModal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', function (event) {
    if (event.target == lightModal) {
      lightModal.style.display = "none";
    }
  });
}