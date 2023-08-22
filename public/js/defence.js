class Enemy {
  constructor(name, maxProgress, element) {
    this.name = name;
    this.element = element;
    this.x = Math.random();
    this.progress = 0;
    this.maxProgress = maxProgress;
  }

  update() {
    this.progress++;
    this.element.style.left = `${this.x * 80}%`;
    this.element.style.top = `${
      this.calcProgress(this.progress / this.maxProgress) * 100
    }%`;
  }

  calcProgress(progress) {
    return progress;
  }

  kill() {
    this.element.remove();
  }
}

// Unpack datastring
const data = document
  .getElementById("data")
  .innerHTML.split("§§")
  .map((a) => {
    return {
      id: a.split("§")[0],
      image: a.split("§")[1],
      name: a.split("§")[2],
      nick: a.split("§")[3],
    };
  });

const area = document.getElementById("game-area");
const input = document.getElementById("input-field");
const counter = document.getElementById("counter");

var remaining = [...data];
var active = [];

setInterval(runTick, 1);
function runTick() {
  if (Math.random() < 0.01) spawn();

  active.forEach((enemy, i) => {
    enemy.update();
    if (enemy.progress >= enemy.maxProgress) {
      enemy.kill();
      active.splice(i, 1);
    }
  });
}

input.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    attack();
  }
});

function attack() {
  const guess = input.value.toLowerCase().split(/\s+/).join(" ");
  active.forEach((enemy) => {
    if (enemy.name.toLowerCase().split(/\s+/)[0] == guess.split(/\s+/)[0])
      enemy.kill();
  });
  active = active.filter(
    (enemy) => enemy.name.toLowerCase().split(/\s+/)[0] != guess.split(/\s+/)[0]
  );
  input.value = "";
}

// spawns an enemy
function spawn() {
  const enemyData = data[(Math.random() * data.length) | 0];
  const element = document.createElement("img");
  element.src = enemyData.image;
  area.appendChild(element);
  const enemy = new Enemy(
    enemyData.name,
    (1000 + Math.random() * 10000) | 0,
    element
  );
  active.push(enemy);
}

// returns a random element from the remaining people and removes it from the array
function getNext() {
  if (remaining.length == 0) remaining = [...data];
  return remaining.splice((Math.random() * remaining.length) | 0, 1)[0];
}
