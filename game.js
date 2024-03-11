let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function nextSequence() {
  level++;
  $("#level-title").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Show sequence to the user with flash animation and sound
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//Click which button is pressed by user and add sounds to buttons clicks
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);

  //Add Animation to User Clicks
  animatePress(userChosenColour);
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
