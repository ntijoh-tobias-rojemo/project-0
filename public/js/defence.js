class Enemy {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }

  update() {}
}

const area = document.getElementById("game-area");
const input = document.getElementById("input-field");
const counter = document.getElementById("counter");

var active = [];

setInterval(runTick, 1000 / 60);
function runTick() {
  active.forEach((enemy) => {
    enemy.update();
  });
}

input.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    attack();
  }
});

function attack() {
  const guess = input.value.toLowerCase().split(/\s+/).join(" ");
  active = active.filter((enemy) => enemy.name.toLowerCase() != guess);
  updatePage();
}

// updates elements on the page
function updatePage() {
  display.src = current.image;
  counter.innerHTML = correct.toString(2).replace(/0/g, "").length;
  input.value = "";
}
