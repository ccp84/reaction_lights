//Get a list of lights
const lights = document.querySelectorAll('.light');
lightOn(lights);

//Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  //run the game once loaded
})

/*
* Timer function used to randomise when the lights change from red to green between 0 and 2 seconds
*/
function lightTimer() {
  return Math.random() * 2000;
}

/*
* Function to select a random light and switch the class to 'light on' then remove it again
* after the specified time from lightTimer function
*/
function lightOn(lights) {
  //Get the number of lights currently on screen and generate a random number from this
  let lightNumber = Math.floor(Math.random() * lights.length);
  let activeLight = lights[lightNumber];
  
  activeLight.classlist.add('light_on');
  //The timeout feature was researched on StackOverflow - see link in credits
  //Turn light off again
  setTimeout(function() {
    timeout = lightTimer();
    activeLight.classlist.remove('light_on');
  },timeOut);
}