//Get a list of lights
const lights = document.querySelectorAll('.light');

//Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {
  //run the game once loaded
  lightOn();

  //Add event listeners to each light
  for (let light of lights) {
    light.addEventListener('click', function () {
      //Call the function to check if score should be incremented on click
      if (light.classList.contains("light_on")) {
        addScore(light);
        light.classList.remove('light_on');
      } else {
        //When a red light is hit, end the game and reset the score count
        let finalScore = document.getElementById('score').innerHTML;
        window.alert(`Oh no you hit a red light. Final score ${finalScore}`);
        resetScore();
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
* Function to set score to zero again when a red light is clicked
*/
function resetScore() {
  let currentScore = document.getElementById('score').innerHTML;
  currentScore = 0;
  document.getElementById('score').innerHTML = currentScore;
}

/*
 * Timer function used to randomise when the lights change from red to green between 1 and 2 seconds
 */
let timer = 0;
let timeOut = 0;

function lightTimer() {
  timer = Math.random() * 2000;
  if (timer <= 1000) {
    timer = 1000;
  }
  return timer;
}

/*
 * Function to select a random light and switch the class to 'light on' then remove it again
 * after the specified time from lightTimer function
 */
function lightOn() {
  //Get the number of elements with class light and generate a random number from this
  let lightNumber = Math.floor(Math.random() * lights.length);
  let activeLight = lights[lightNumber];
  activeLight.classList.add('light_on');

  //The timeout feature was researched on StackOverflow - see link in credits
  //Turn light off again
  setTimeout(function () {
    timeOut = lightTimer();
    lightOff(activeLight);
  }, timeOut);
}

/*
 *Function to remove the light on status and re run the game sequence
 */
function lightOff(activeLight) {
  activeLight.classList.remove('light_on');
  lightOn();
}