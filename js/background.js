// --- CANVAS BACKGROUND LOGIC ---
const canvas = document.getElementById("topography-canvas");
const ctx = canvas.getContext("2d");

const config = {
  lineCount: 18,
  lineColor: "rgba(255, 255, 255, 0.08)",
  speed: 0.5,
  stepX: 15,
  fpsLimit: 40,
};

let width, height, dpr;
let tick = 0;
let lastFrameTime = 0;

function resize() {
  dpr = Math.min(window.devicePixelRatio, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
}

window.addEventListener(
  "resize",
  () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(resize, 200);
  },
  { passive: true },
);

function animate(currentTime) {
  requestAnimationFrame(animate);
  const delta = currentTime - lastFrameTime;
  if (delta < 1000 / config.fpsLimit) return;
  lastFrameTime = currentTime;

  tick += 0.005 * config.speed;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  const spacing = height / (config.lineCount - 1);

  for (let i = 0; i < config.lineCount; i++) {
    const baseY = spacing * i;
    ctx.beginPath();

    for (let x = -50; x <= width + 50; x += config.stepX) {
      const noise = Math.sin(x * 0.002 + tick + i * 0.5) * 40;
      const y = baseY + noise;

      if (x === -50) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

resize();
requestAnimationFrame(animate);
