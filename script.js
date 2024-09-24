// script.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];

class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx * 4;
        this.dy = dy * 4;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    changeColor() {
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
}

function checkCollision() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let dx = balls[i].x - balls[j].x;
            let dy = balls[i].y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < balls[i].radius + balls[j].radius) {
                balls[i].changeColor();
                balls[j].changeColor();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
    checkCollision();
    requestAnimationFrame(animate);
}

function init() {
    for (let i = 0; i < 20; i++) {
        let radius = Math.random() * 20 + 10;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 4; // 速度因子增加到5
        let dy = (Math.random() - 0.5) * 4; // 速度因子增加到5
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        balls.push(new Ball(x, y, dx, dy, radius, color));
    }
    animate();
}

init();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
