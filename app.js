//Array used to select random sequence
var buttonColors = ['red', 'blue', 'green', 'yellow'];

//Level starts at 0
var level = 0;

//Triggers game to start and go into nextSequence
var started = false;

//Pattern generated by game
var gamePattern = [];

//User's pattern entered
var userClickedPattern = [];

//default no sound
let sound = false;

//Call nextSequence once keyboard key is pressed
$(document).keypress(function () {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function () {
  //get attribute value of element to store in userClickedPattern
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //Compare player's pattern with game pattern
  checkAnswer(userClickedPattern.length - 1);
});

//event to toggle sound
$('.sound').click((e) => {
  if (sound === false) {
    e.target.src = 'public/icons/sound-on.png';
    sound = true;
  } else {
    e.target.src = 'public/icons/sound-off.png'
    sound = false;
  }
});

function checkAnswer(currentLevel) {
  //Checks if userClickedPattern matches gamePattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //Checks if user entered in full statement
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //Sound when user enters wrong answer
    playSound('wrong');
    //overlay when game is over
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    //Ask player to restart game
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

//nextSequence generates gamePattern player must attempt to replicate
function nextSequence() {
  //Temporarily store players input each level
  userClickedPattern = [];
  //Update player's level
  level++;
  $('#level-title').text('Level ' + level);
  //randomNumber chooses color from array of buttonColors
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  //randomChosenColor gets pushed into new array gamePattern
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //Add audio to randomChosenColor based on buttonColors
  playSound(randomChosenColor);
}

//Plays sound everytime button is activated
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  if (sound) {
    audio.volume = 0.5;
    audio.play();
  }
}

//Animates button selected by user
function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

//Reset game and start over
function startOver() {
  level = 0;
  gamePattern = [];
  $(document).keypress(started = false);
  started = false;
}