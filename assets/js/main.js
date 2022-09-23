// Get a list of lights
const lights = document.querySelectorAll('.light');
let endGame = false; // set the end of game variable to false on load;

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {
  // run the game once loaded
  let startButton = document.getElementById('start');
  startButton.addEventListener('click', function() {
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
        let finalScore = document.getElementById('score').innerHTML;
        window.alert(`Oh no you hit a red light. Final score ${finalScore}`);
        endGame = true;
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
 */
let timer = 0;
let timeOut = 0;

function lightTimer() {
  timer = Math.random() * 2000;
  if (timer <= 500) {
    timer = 500;
  }
  return timer;
}

/*
 * Function to select a random light and switch the class to 'light on' then remove it again
 * after the specified time from lightTimer function
 */
function lightOn() {
  // check if the endGame variable has been triggered by a red light
  if(!endGame){
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
rules.addEventListener('click',function() {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click',function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});