const data = document
  .getElementById("data")
  .innerHTML.split("§§")
  .map((a) => {
    return { image: a.split("§")[0], name: a.split("§")[1] };
  });

var correct = 0;
const total = data.length;
