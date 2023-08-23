// get canvas context
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

// setup
ctx.fillStyle = "#e0e0e0";

// draw some triangles
for (let i = 0; i < 50; i++) {
  const startX = Math.random() * 1000;
  const startY = Math.random() * 1000;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(
    startX + Math.random() * 200 - 100,
    startY + Math.random() * 200 - 100
  );
  ctx.lineTo(
    startX + Math.random() * 200 - 100,
    startY + Math.random() * 200 - 100
  );
  ctx.closePath();
  ctx.fill();
}
