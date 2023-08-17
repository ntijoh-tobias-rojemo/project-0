const data = document
  .getElementById("data")
  .innerHTML.split("§§")
  .map((a) => {
    return { image: a.split("§")[0], name: a.split("§")[1] };
  });

var correct = 0;
const total = data.length;

const display = document.getElementById("image-display");
const input = document.getElementById("input-field");
const button = document.getElementById("submit-button")
const counter = document.getElementById("counter");
document.getElementById("total").innerHTML = total;