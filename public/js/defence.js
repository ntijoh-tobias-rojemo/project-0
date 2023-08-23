// the base class for each enemy
class Enemy {
  constructor(data, maxProgress, element) {
    this.data = data;
    this.name = data.name;
    this.nick = data.nick;
    this.element = element;
    this.x = Math.random();
    this.progress = 0;
    this.maxProgress = maxProgress;
  }

  // advances the enemy a tick and updates it on the page
  update() {
    this.progress++;
    this.element.style.left = `${this.x * 80}%`;
    this.element.style.top = `${
      this.calcProgress(this.progress / this.maxProgress) * 100 - 20
    }%`;
    this.element.style.border = `4px solid hsl(${
      90 - (120 * this.progress) / this.maxProgress
    } 50% 50%)`;
  }

  // the default function for a linear progression
  calcProgress(progress) {
    return progress;
  }

  // removes an enemy from the DOM and adds it back to the list of remaining enemies
  kill() {
    remaining.push(this.data);
    this.element.remove();
  }
}

// an enemy that attacks from below
class SneakyEnemy extends Enemy {
  calcProgress(progress) {
    return 1 - Math.log(progress);
  }
}

// an enemy that starts fast
class JumpstartEnemy extends Enemy {
  calcProgress(progress) {
    return 2 - 2 ** ((1 - progress) ** 3);
  }
}

// an enemy that starts slow
class AcceleratingEnemy extends Enemy {
  calcProgress(progress) {
    return 2 ** (progress ** 5) - 1;
  }
}

// Unpack datastring
const gameData = document
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

 // get elements
const area = document.getElementById("game-area");
const input = document.getElementById("input-field");
const counter = document.getElementById("counter");

// setup
var remaining = [...gameData];
var active = [];
var score = 0;

// run a tick every ms
setInterval(runTick, 1);
function runTick() {
  if (Math.random() < 0.002) spawn();

  active.forEach((enemy, i) => {
    enemy.update();
    if (enemy.progress >= enemy.maxProgress) {
      score--;
      enemy.kill();
      active.splice(i, 1);
    }
  });
  counter.innerHTML = score;
}

// resolve an attack when a name is submitted
input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    attack();
  }
});

function attack() {
  const guess = input.value.toLowerCase().split(/\s+/).join(" ");

  // remove the enemies from the DOM and adjust score
  active.forEach((enemy) => {
    if (
      (guess.split(/\s+/).length == 1 &&
        (enemy.name.split(/\s+/)[0].toLowerCase() == guess ||
          (enemy.nick != "NO_NICK" &&
            enemy.nick.split(/\s+/)[0].toLowerCase() == guess))) ||
      enemy.name.toLowerCase() == guess ||
      (enemy.nick != "NO_NICK" && enemy.nick.toLowerCase() == guess)
    ) {
      score += (10000 / enemy.maxProgress) | 0;
      enemy.kill();
    }
  });

  // clean up the active list
  active = active.filter(
    (enemy) =>
      !(
        (guess.split(/\s+/).length == 1 &&
          (enemy.name.split(/\s+/)[0].toLowerCase() == guess ||
            (enemy.nick != "NO_NICK" &&
              enemy.nick.split(/\s+/)[0].toLowerCase() == guess))) ||
        enemy.name.toLowerCase() == guess ||
        (enemy.nick != "NO_NICK" && enemy.nick.toLowerCase() == guess)
      )
  );

  // update page
  input.value = "";
  counter.innerHTML = score;
}

// spawns an enemy
function spawn() {
  const enemyData = getNext();
  if (!enemyData) return;
  const element = document.createElement("img");
  const maxProgress = (1000 + Math.random() * 9000) | 0;
  element.src = enemyData.image;
  area.appendChild(element);
  let enemy;
  const choice = Math.random();
  if (choice < 0.1)
    enemy = new AcceleratingEnemy(enemyData, maxProgress, element);
  else if (choice < 0.2)
    enemy = new JumpstartEnemy(enemyData, maxProgress, element);
  else if (choice < 0.3)
    enemy = new SneakyEnemy(enemyData, maxProgress, element);
  else enemy = new Enemy(enemyData, maxProgress, element);

  active.push(enemy);
}

// returns a random element from the remaining people and removes it from the array
function getNext() {
  if (remaining.length == 0) return null;
  return remaining.splice((Math.random() * remaining.length) | 0, 1)[0];
}
