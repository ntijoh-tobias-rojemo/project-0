const data = document
  .getElementById("data")
  .innerHTML.split("§§")
  .map((a) => {
    return { image: a.split("§")[0], name: a.split("§")[1] };
  });

const display = document.getElementById("image-display");
const input = document.getElementById("input-field");
const button = document.getElementById("submit-button");
const counter = document.getElementById("counter");

var correct = 0;
const total = data.length;

var left = [...data];
var current = getNext();
updatePage();

document.getElementById("total").innerHTML = total;

button.addEventListener("click", () => {
  const guess = input.value;
  if (current.name == guess) correct++;
  if (left.length == 0) {
    window.alert(`You got ${correct}/${total} correct!`);
    left = [...data];
    correct = 0;
  }
  current = getNext();
  updatePage();
  input.value = "";
});

function getNext() {
  return left.pop(getRandInt(0, left.length));
}

function updatePage() {
  display.src = current.image;
  counter.innerHTML = correct;
}

function getRandInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
