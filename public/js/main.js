// Unpack datastring
const data = document
  .getElementById("data")
  .innerHTML.split("§§")
  .map((a) => {
    return { image: a.split("§")[0], name: a.split("§")[1] };
  });

// get elements
const display = document.getElementById("image-display");
const input = document.getElementById("input-field");
const button = document.getElementById("submit-button");
const counter = document.getElementById("counter");

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
  const guess = input.value;
  if (current.name == guess) correct++;
  if (left.length == 0) {
    window.alert(`You got ${correct}/${total} correct!`);
    left = [...data];
    correct = 0;
  }
  current = getNext();
  updatePage();
}
