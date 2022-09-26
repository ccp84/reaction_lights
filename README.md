# PP2 - Reaction Lights by Cheryl Phillips 

## Concept
Reaction Lights is a JavaScript game to test reaction speed. The user must react to on screen colour changes, however, any incorrect clicks will end your winning streak. How high can you get your score count before you hit a red light?

## User Stories
Visitors to the site must be able to :
* Load the game on their device
* Find out how to play the game
* See their score tally
* Start a new game

## Features of the site
* Rules to display on a separate page, easily accessed from the main page
* Score to be displayed clearly at all times
* Game mode to change depending on the device the game is being played on

## Wireframes

### Mobile View
![Mobile View Wireframe](documentation/wireframes/mobile_view.png)

The mobile game will be a streamlined 2 button game with score and rules stacked underneath. All elements will be in 1 column on screen to most effective use of space and to prevent any scrolling while the game is in play.

### Tablet View
![Tablet View Wireframe](documentation/wireframes/tablet_view.png)

The tablet game will have a slightly larger 4 button setup to increase the use of a larger space and make the game more of a challenge whilst still ensuring there is no need to scroll and ruin game play. 

### Desktop View

![Desktop View Wireframe](documentation/wireframes/desktop_view.png)

The desktop game will be the most advanced version with a 3 x 3 button grid, maximising the use of space and layout to provide the best gaming experience for the space available. 

## Project Development

### Game Canvas

The mobile game has a slimmer background image, with a vertical single column CSS grid system displaying only stacked 2 buttons. For this a media query has been used to hide the remainder of the buttons on screens 600px and smaller. The mobile game is the standard display and is the base game developed with the larger verions developed from this initial 2 button version. 

The tablet game is designed on a larger 2 column CSS grid, displaying 4 buttons. This is achieved by changing the grid for a media query when the screen width is a minimum of 600px. 

The full desktop game features a 3 column CSS grid and 9 buttons. This view appears for screen sizes over 992px. 

### Timer Function

The `lightTimer` function in the game is used to randomise how long is it between each state change for the lights. This is achieved by using `Math.random()`, and multiplying this by 2000 to get a time up to 2 seconds. There was no need to turn this into a whole number as it does not matter for the game play. 
In order to not have a 0 seconds delay between on and off states. Code is used to check if the random number produced is less than 500 which is 500ms or half a second :
```js
if (timer <= 500) {
    timer = 500;
  }
```
If this is the case then the timer is set to 0.5 seconds.

### Light On Function (Main game play)

Main game play is achieved by the `lightOn` function. This function first of all selects a random number from the lights node list which is called from the DOM and stored in the variable `lights`. It does this by using `Math.random` and multiplying that by `lights.length`. This time as the light needs to be an integer, `Math.floor` is also used. Next the random light div that has been selected is assigned to the variable `activeLight`, and the class `light_on` is added to turn it green. 

After an amount of time determined by the function `lightTimer`, `lightOff` is called to remove the `light_on` class and return the light to red again. I used `setTimeOut` code from [Stack Overflow](https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript) to implement the delay between turning the light on and off.

### Light off function

The function to retun the light to red simply calls `activeLight.classList.remove('light_on');` and then once the game has been reset, calls the `lightOn` function to pick the next light to become active thus creating a game loop. 

### Increment score function

`addScore` is triggered based on the `if` statement in the main game loading sequence. When a player hits a light whilst in the on state, `addScore` fetches the current number stored in the HTML element with the ID of score and increments it by 1, before writing it back to the inner HTML of that same element to display the updated score tally to the player on screen. 

### Reset score function

`resetScore` is triggered either when the player starts a new game, or when a player hits a red light during game play to set the score back to 0 again. The function fetches the current number stored in the HTML elements with the ID of score and over writes it with 0 before writing the new value back to the DOM. If `resetScore` was triggered by a red light hit, an alert is shown on screen to let the player know they hit a red light. 

### Rules Button

The rules for the game are designed as a modal popup. I used code from W3 schools to implement this feature, making changes to the styling to match the overall theme of the game. The original tutorial for this feature can be found [here](https://www.w3schools.com/howto/howto_css_modals.asp). This code used older `var` and `onClick` code, and so I have updated these instances with `let` and `addEventListener` code to ensure the coding is up to date and future proof. 

### Start Button

The game is not active upon loading the webpage, the user triggers this by selecting the start game button at the bottom of the page. There is an event listener attached to the start button that calls the `lightOn()` function to start the game loop running. This allows the player some element of control over the game and gives a similar feel to not having music and sound instantly playing at you when you load a webpage, the lights of the game do not instantly start flashing upon loading the page for the first time for a better user experience.

## Technologies Used

* HTML
* CSS
* JavaScript
* GitHub
* Chrome DevTools
* Canva
* Paint.NET
* Google Fonts
## Testing

[Link to testing carried out](TESTING.md)

## Deployment

The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the [GitHub repository](https://github.com/ccp84/reaction_lights), navigate to the Settings tab 
  - From the source section drop-down menu, select the **Main** Branch, then click "Save".
  - The page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found [here](https://ccp84.github.io/reaction_lights)

### Local Deployment

In order to make a local copy of this project, you can clone it. In your IDE Terminal, type the following command to clone my repository:

- `git clone https://github.com/ccp84/reaction_lights.git`

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ccp84/reaction_lights)

## Credits

* The `setTimeout()` code for timing of switching lights on and off was used from [Stack Overflow](https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript).
* The modal box popup for the rules is taken from [W3Schools](https://www.w3schools.com/howto/howto_css_modals.asp).
* Sniglet font used from [Google Fonts](https://fonts.google.com/specimen/Sniglet).
* Code for getting the currently checked radio button used from [Stack Overflow](https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value).

