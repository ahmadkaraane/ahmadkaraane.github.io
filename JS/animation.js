const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

// Set canvas size to match the header's dimensions
const header = document.querySelector("header");
canvas.width = header.offsetWidth;
canvas.height = header.offsetHeight;
// Create an array to hold the particles
const particles = [];

// Create a Particle class
class Particle {
  constructor(x, y, size, opacity, speed, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = opacity;
    this.color = `rgba(255, 255, 255, ${this.opacity})`;
    this.speed = speed;
    this.direction = direction; // Direction can be 1 (top to bottom) or -1 (bottom to top)
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.y += this.direction * this.speed;
    this.x += Math.random() * 2 - 1; // Add a slight horizontal randomness

    // Recycle particles when they go out of bounds within the canvas
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

// Create and animate particles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (particles.length < 100 && Math.random() < 0.5) {
    const x = Math.random() * canvas.width;
    const size = Math.random() * 2 + 1; // Smaller size
    const opacity = Math.random() * 0.4 + 0.1; // Adjusted opacity
    const speed = Math.random() * 1.2 + 1; // Random speed between 1 and 3
    const direction = Math.random() < 0.5 ? 1 : -1; // Randomly choose direction
    particles.push(
      new Particle(
        x,
        direction === 1 ? -size : canvas.height + size,
        size,
        opacity,
        speed,
        direction
      )
    );
  }

  particles.forEach((particle) => {
    particle.update();
  });
}

animate();
