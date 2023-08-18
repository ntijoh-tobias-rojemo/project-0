// Unpack datastring
const data = document
  .getElementById("data")
  .innerHTML.split("§§")
  .map((a) => {
    return {
      image: a.split("§")[0],
      name: a.split("§")[1],
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

// returns a random element from the people left and removes it from the array
const getNext = () => left.splice((Math.random() * left.length) | 0, 1)[0];

// updates elements on the page
function updatePage() {
  display.src = current.image;
  counter.innerHTML = correct;
  input.value = "";
}

// setup
var correct = 0;
const total = data.length;
document.getElementById("total").innerHTML = total;

var left = [...data];
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
  const guess = input.value.toLowerCase();
  if (
    (!guess.includes(" ") &&
      (current.name.split(/\s+/)[0].toLowerCase() == guess ||
        (current.nick != "NO_NICK" &&
          current.nick.split(/\s+/)[0].toLowerCase() == guess))) ||
    current.name.toLowerCase() == guess ||
    (current.nick != "NO_NICK" && current.nick.toLowerCase() == guess)
  ) {
    correct++;
    response.innerHTML = "Correct!";
    responseBox.style.backgroundColor = "lightgreen";
  } else {
    response.innerHTML = `Incorrect. The correct name was ${current.name}`;
    responseBox.style.backgroundColor = "pink";
  }
  if (left.length == 0) {
    window.alert(`You got ${correct}/${total} correct!`);
    left = [...data];
    correct = 0;
  }
  current = getNext();
  updatePage();
}
