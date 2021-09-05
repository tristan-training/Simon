var gameStarted = false;
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var gamePattern = [];

var userClickedPattern = [];

$("div.smallbtn").on("click", function () {
  if (gameStarted === false) {
    initialise();
  }
});

$("div.btn").on("click", function () {
  var userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (validateSequence() === true) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    gameStarted = false;
    playSound("wrong");
    $("#level-title").text("Game Over. Press A Key to Start");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }
});

$("body").on("keydown", function () {
  if (gameStarted === false) {
    initialise();
  }
});

function initialise() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameStarted = true;
  nextSequence();
}

function validateSequence() {
  if (userClickedPattern.length > gamePattern.length) return false;

  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) return false;
  }

  return true;
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColors[randomNumber];

  $("#level-title").text("Level " + level);

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  $("div." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  level++;
}

function playSound(soundColor) {
  var audio = new Audio("sounds/" + soundColor + ".mp3");
  audio.play();
}

function animatePress(pressColor) {
  $("div." + pressColor).addClass("pressed");

  setTimeout(function () {
    $("div." + pressColor).removeClass("pressed");
  }, 200);
}
