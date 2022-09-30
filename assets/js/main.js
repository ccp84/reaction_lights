/* jshint esversion: 11 */
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
	lights.forEach((light) => {
		light.addEventListener('click', () => {
			// Call the function to check if score should be incremented on click
			if (light.classList.contains("light_on")) {
				addScore(light);
				light.classList.remove('light_on');
			} else {
				// When a red light is hit, end the game
				endGame = true;
				// Check if there is a new high score
				highestScore();
				// Show on screen message
				alertModal();
			}
		});

	});
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
 * Function to check and update highest score
 */
function highestScore() {
	let highScore = parseInt(document.getElementById('high_score').innerHTML);
	let checkScore = parseInt(document.getElementById('score').innerHTML);
	if (checkScore > highScore) {
		highScore = checkScore;
		document.getElementById('high_score').innerHTML = highScore;
	}
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
		lights.forEach(light => {
			light.classList.remove("disable");
		});
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
	} else {
		lights.forEach(light => {
			light.classList.add("disable");
		});
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
 * Add event listener to colour change buttons and handle change of CSS root variable
 * Tutorial for changing root variables followed from W3 Schools
 * https://www.w3schools.com/css/css3_variables_javascript.asp
 */
let endColour = "red"; // Used in the game end alert modal
const redGreen = document.getElementById('redgreen');
redGreen.addEventListener('click', () => {
	endColour = "red";
	let rootVars = document.querySelector(':root');
	rootVars.style.setProperty('--on-colour', 'rgb(144,238,144)');
	rootVars.style.setProperty('--on-border', 'rgb(0,128,0)');
	rootVars.style.setProperty('--off-colour', 'rgb(255,0,0)');
	rootVars.style.setProperty('--off-border', 'rgb(0,0,0)');
	// Change text of rules modal for colour change
	let redGreenRules = `<ul>
  <li>Tap on the lights when they go green</li>
  <li>Score one point per green light</li>
  <li>Avoid red lights</li>
  <li>Hit a red light and your score resets to zero</li>
  <li>How high can you score?</li>
  </ul>`;
	document.getElementById('inner_rules').innerHTML = redGreenRules;
});

const yellowBlue = document.getElementById('yellowblue');
yellowBlue.addEventListener('click', () => {
	endColour = "blue";
	let rootVars = document.querySelector(':root');
	rootVars.style.setProperty('--on-colour', 'rgb(255,255,0)');
	rootVars.style.setProperty('--on-border', 'rgb(204,204,0)');
	rootVars.style.setProperty('--off-colour', 'rgb(0,0,255)');
	rootVars.style.setProperty('--off-border', 'rgb(0,0,0)');
	// Change text of rules modal for colour change
	let yellowBlueRules = `<ul>
  <li>Tap on the lights when they go yellow</li>
  <li>Score one point per yellow light</li>
  <li>Avoid blue lights</li>
  <li>Hit a blue light and your score resets to zero</li>
  <li>How high can you score?</li>
  </ul>`;
	document.getElementById('inner_rules').innerHTML = yellowBlueRules;
});

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
	//Set modal message to current score and game colour
	let finalScore = document.getElementById('score').innerHTML;
	let alertMessage = `Oh no you hit a ${endColour} light. Final score ${finalScore}`;
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