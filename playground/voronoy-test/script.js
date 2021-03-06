var useColorInput = document.querySelector('#useColor');
var useShadowInput = document.querySelector('#useShadow');
var showPointsInput = document.querySelector('#showPoints');
useColorInput.addEventListener('input', init);
useShadowInput.addEventListener('input', init);
showPointsInput.addEventListener('input', init);
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var container = document.querySelector('.container');
container.append(canvas);
canvas.width = 128;
canvas.height = 128;
window.onresize = changeCanvasSize;
function changeCanvasSize() {
    var innerHeight = window.innerHeight, innerWidth = window.innerWidth;
    var width, height;
    if (innerHeight >= innerWidth) {
        width = innerWidth * 0.9;
        height = innerWidth * 0.9;
    }
    else {
        width = innerHeight * 0.9;
        height = innerHeight * 0.9;
    }
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
}
changeCanvasSize();
var pointsQuantity = 20;
var points = [];
function init() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    for (var i = 0; i < pointsQuantity; i++) {
        var x = random(5, canvas.width - 5);
        var y = random(5, canvas.height - 5);
        var color = void 0;
        if (useColorInput.checked) {
            color = randomColor();
        }
        else {
            color = [255, 255, 255, Math.random()];
        }
        points.push({
            id: i,
            x: x,
            y: y,
            color: color,
            velocity: { x: random(-2, 2), y: random(-2, 2) }
        });
    }
    draw();
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(function (point) {
        if (point.x > canvas.width) {
            point.x = 0;
        }
        else if (point.x < 0) {
            point.x = canvas.width;
        }
        else {
            point.x += point.velocity.x;
        }
        if (point.y > canvas.height) {
            point.y = 0;
        }
        else if (point.y < 0) {
            point.y = canvas.height;
        }
        else {
            point.y += point.velocity.y;
        }
    });
    for (var i = 0; i < canvas.width; i++) {
        for (var j = 0; j < canvas.height; j++) {
            var shortestDistance = {
                point: null,
                distance: canvas.width
            };
            for (var k = 0; k < pointsQuantity; k++) {
                var distance = Math.sqrt(Math.pow(points[k].x - i, 2) + Math.pow(points[k].y - j, 2));
                if (distance < shortestDistance.distance) {
                    shortestDistance.distance = distance;
                    shortestDistance.point = points[k];
                }
            }
            if (useShadowInput.checked) {
                shortestDistance.point.color[3] = 1 - shortestDistance.distance * 0.025;
            }
            context.fillStyle = "rgba(" + shortestDistance.point.color.join(', ') + ")";
            context.fillRect(i, j, 1, 1);
        }
    }
    if (showPointsInput.checked) {
        points.forEach(function (point) {
            context.fillStyle = '#FFF';
            context.fillRect(point.x, point.y, 1, 1);
        });
    }
    // requestAnimationFrame(draw);
}
init();
