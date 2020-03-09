let canvas;
let context;
let width;
let height;

let interval_id;

let ps = [];

let player = {
    x : 0,
    y : 150,
    size : 10
};

let moveRight = false;
let moveUp = false;
let moveDown = false;

document.addEventListener('DOMContentLoaded', init, false);

function init() {
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    window.addEventListener('keydown', activate, false)
    window.addEventListener('keyup', deactivate, false)

    interval_id = window.setInterval(draw, 33);
}

function draw() {
    if (ps.length < 10) {
        let p = {
            x : width,
            y : getRandomNumber(0, height),
            size : 10,
            xChange : getRandomNumber(-10, -1),
            yChange : 0
        };
        ps.push(p);
    }
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'purple';
    for (let p of ps) {
        context.fillRect(p.x, p.y, p.size, p.size);
    }
    context.fillStyle ='red';
    context.fillRect(player.x, player.y, player.size, player.size);
    if (player.x + player.size >= width) {
        stop();
        window.alert('YOU WIN!');
        return;
    }
    for (let p of ps) {
        if (collides(p)) {
            stop();
            window.alert('YOU LOSE!');
            return;
        }
    }
    for (let p of ps) {
        p.x = p.x + p.xChange;
        p.y = p.y + p.yChange;
        if (p.x <= -p.size) {
            p.x = width;
        }
    }
    if (moveRight) {
        player.x += 3;
    }
    if (moveUp) {
        player.y -= 3;
    }
    if (moveDown) {
        player.y += 3;
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collides(p) {
    if (player.x + player.size < p.x ||
        p.x + p.size < player.x ||
        player.y > p.y + p.size ||
        p.y > player.y + player.size) {
        return false;
    } else {
        return true;
    }
}

function stop() {
    clearInterval(interval_id);
    window.removeEventListener('keydown', deactivate)
    window.removeEventListener('keyup', deactivate)
}

function activate(event) {
	let keyCode = event.keyCode;
	if (keyCode === 38) {
		moveUp = true
	}
	else if (keyCode === 39) {
		moveRight = true
	}
	else if (keyCode ===40) {
		moveDown = true
	}
}

function deactivate(event) {
	let keyCode = event.keycode;
	if (keyCode === 38) {
		moveUp = false
	}
	else if (keyCode === 39) {
		moveRight = false
	}
	else if (keyCode ===40) {
		moveDown = false
	}
}



