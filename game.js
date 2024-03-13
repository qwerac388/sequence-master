let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function nextSequence() {
  //reset to empty array ready for the next level
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  //generate random number ranging from 1-4
  const randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  //Show sequence to the user with flash animation and sound
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//Click which button is pressed by user and add sounds to buttons clicks
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
  console.log(userClickedPattern.length);

  playSound(userChosenColour);

  //Add Animation to User Clicks
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

//Detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

//check if the most recent user answer is the same as game pattern and check if user finished their sequence
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    //Apply sound, flash effect and changing h1 text for Game Over case
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    //Restart the game
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
