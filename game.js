var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var correct = false;
var gameActive;

function flashButton(button) {
  button.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(button) {
  switch (button) {
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      break;
    case "red":
      var audio = new Audio("sounds/red.mp3");
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      break;
    default:
      var audio = new Audio("sounds/wrong.mp3");
  }

  audio.play();
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChooseColour = buttonColours[randomNumber];
  gamePattern.push(randomChooseColour);

  var chosenButton = $("#" + randomChooseColour);
  flashButton(chosenButton);
  playSound(randomChooseColour);
  console.log(gamePattern);
  userClickedPattern = [];
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  $("#level-title").text("Press Any Key to Start");
  level = 0;
  gamePattern = [];
  gameActive = false;
  $(".btn").off("click",myHandler);
  $(document).on("keydown",handleKeyPress);
  console.log("game is over ");
  console.log("level: " + level);
  console.log("gamePattern: " + gamePattern);
  console.log("gameActive: " + gameActive);
}

function checkAnswer(currentLevel) {
  correct = userClickedPattern[currentLevel] === gamePattern[currentLevel];
  if (correct) {
    console.log("pass");
  } else {
    $("body").addClass("game-over");
    playSound();
    console.log("fail");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function myHandler() {
  var userChosenColour;
  var buttonId = $(this).attr("id");

  userChosenColour = buttonId;
  userClickedPattern.push(userChosenColour);

  console.log("clicked button: " + buttonId);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  var lastPattern = userClickedPattern.length - 1;
  checkAnswer(lastPattern);

  if (lastPattern === (gamePattern.length-1)) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
  console.log("clear userClickPattern length  = " + userClickedPattern.length);
}

function handleKeyPress() {
  $("#level-title").text("Level " + level);
  nextSequence();
  $(document).off("keydown", handleKeyPress);
  $(".btn").on("click",myHandler);
  gameActive = true;
}

function handleGameState() {

  console.log("in handleGameState");
  if (!gameActive) {
    $(document).on("keydown", handleKeyPress);
  } else {
    console.log("handleDameState in false case");
    $(".btn").off("click").on("click",myHandler);
  }
}

$(document).ready(function() {
    handleGameState();
});
