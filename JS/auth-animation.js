const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor(x, y, size, opacity, speed, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = opacity;
    this.color = `rgba(255, 255, 255, ${this.opacity})`;
    this.speed = speed;
    this.direction = direction;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.y += this.direction * this.speed;
    this.x += Math.random() * 2 - 1;

    if (this.direction === 1 && this.y > canvas.height + this.size) {
      this.y = -this.size;
      this.x = Math.random() * canvas.width;
    } else if (this.direction === -1 && this.y < -this.size) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }

    this.draw();
  }
}

const initialParticleCount = 100;

for (let i = 0; i < initialParticleCount; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 2 + 1;
  const opacity = Math.random() * 0.4 + 0.1;
  const speed = Math.random() * 1.2 + 1;
  const direction = Math.random() < 0.5 ? 1 : -1;

  particles.push(new Particle(x, y, size, opacity, speed, direction));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

animate();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Adjust the size and shape of existing particles when the canvas is resized
  particles.forEach((particle) => {
    particle.x = Math.random() * canvas.width;
    particle.y = Math.random() * canvas.height;
    // You can adjust size and other properties here as needed
  });
}

// Initial canvas setup
resizeCanvas();

// Add a window resize event listener to adjust the canvas size
window.addEventListener("resize", resizeCanvas);
