var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

/* Math lib
Math.PI
Math.random();
*/

/*
// Line
c.beginPath(); // Reinicia el punto de partida
c.moveTo(50, 100); // Establece el punto de partida
c.lineTo(300, 100); // Establece punto final
c.lineTo(90, 30);

c.strokeStyle ='rgba(0, 0, 255, 0.5)'; // Da color a la linea
c.stroke(); // Pinta la linea

// Rect
c.fillStyle = 'rgba(89, 34, 25, 0.9)'; // Da color al relleno
c.fillRect(100, 110, 100, 100);

// Arc
c.beginPath();
c.arc(200, 250, 25, 0, Math.PI * 2,false);
c.strokeStyle = 'blue';
c.stroke();
*/

// Evento

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function (event) {
    //console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;

});

window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Circle
var x = 100;
var y = 100;
var radius = 30;
var dx = 1;
var dy = 1;
var maxRadius = 40;
var minRadius = 2;
var colorArray = ['#384059', '#F1DE98', '#F0B885', '#D66761', '#EE6C62'];

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interaccion
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circles = [];

function init() {
    circles = [];

    for (var i = 0; i < 800; i++) {
        var x = Math.random() * (canvas.width - radius * 2) + radius;
        var y = Math.random() * (canvas.height - radius * 2) + radius;
        var radius = Math.random() * 3 + 1;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var circle = new Circle(x, y, dx, dy, radius);
        circles.push(circle);
    }
}

function animate() {
    requestAnimationFrame(animate); // Crea un loop infinito para la animacion
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 800; i++) {
        circles[i].update();
    }
    //console.log(dx);


}

init();
animate();