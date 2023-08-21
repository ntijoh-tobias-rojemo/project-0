// Unpack datastring
const data = document
  .getElementById("data")
  .innerHTML.split("§§")
  .map((a) => {
    return {
      image: a.split("§")[0],
      name: a.split("§")[1].toLowerCase(),
      nick: a.split("§")[2],
    };
  });

// get elements
const display = document.getElementById("image-display");
const input = document.getElementById("input-field");
const button = document.getElementById("submit-button");
const counter = document.getElementById("counter");
const responseBox = document.getElementById("response-box");
const response = document.getElementById("response");

// returns a random element from the remaining people and removes it from the array
const getNext = () => data.splice((Math.random() * data.length) | 0, 1)[0];

// updates elements on the page
function updatePage() {
  display.src = current.image;
  counter.innerHTML = correct.length;
  input.value = "";
}

// setup
const correct = [];
document.getElementById("total").innerHTML = data.length;
var current = getNext();
updatePage();

// each time the button is clicked or enter is pressed in the textbox, run the page logic
button.addEventListener("click", tick);
input.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    tick();
  }
});

function tick() {
  const guess = input.value.toLowerCase().split(/\s+/).join(" ");
  if (
    // if guess is only for firt name, compare only to first name, otherwise require full name
    // for people with nicknames, also accept nicknames
    (!guess.includes(" ") &&
      (current.name.split(/\s+/)[0] == guess ||
        (current.nick != "NO_NICK" &&
          current.nick.split(/\s+/)[0] == guess))) ||
    current.name == guess ||
    (current.nick != "NO_NICK" && current.nick == guess)
  ) {
    correct.push(current.name)
    response.innerHTML = "Correct!";
    response.style.fontSize = "2rem";
    responseBox.style.backgroundColor = "lightgreen";
  } else {
    response.innerHTML = `Incorrect. The correct name was ${current.name}`;
    response.style.fontSize = "1rem";
    responseBox.style.backgroundColor = "pink";
  }
  if (data.length == 0) {
    // send to result page
  }
  current = getNext();
  updatePage();
}
