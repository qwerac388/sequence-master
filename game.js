let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Show sequence to the user with flash animation and respective sound
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

  let audio = new Audio(`sounds/${randomChosenColour}.mp3`);
  audio.play();
}
nextSequence();
