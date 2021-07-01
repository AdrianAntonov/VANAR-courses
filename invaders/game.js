let showScore = newEl('div', 'score');
showScore.innerText = `Score: 0`;

function addInvader() {
	let div = newEl('div', 'invader');
	$('#map').appendChild(div);
	// plasam info despre 2 cadre ale animatiei
	// in data -> div
	setData(div, 'frames', [ '-398px -480px', '-500px -480px' ]);
	setData(div, 'speed', 5 + parseInt(Math.random() * 5));
	setData(div, 'width', 80);
	setData(div, 'height', 80);
	setData(div, 'x', 2 + parseInt(Math.random() * 400));
	setData(div, 'y', 2);

	div.style.backgroundPosition = getData(div, 'frames').split(',')[0];

	let interval = setInterval(() => {
		setData(div, 'interval', interval);

		let frames = getData(div, 'frames').split(',');

		frames.push(frames.shift());

		setData(div, 'frames', frames);

		div.style.backgroundPosition = getData(div, 'frames').split(',')[0];

		// movement
		let x = +getData(div, 'x');
		let y = +getData(div, 'y');

		if (x >= div.parentElement.dataset.width - div.dataset.width - 5 || x <= 5) {
			setData(div, 'speed', -getData(div, 'speed'));

			y += Math.abs(+getData(div, 'speed'));
			setData(div, 'y', y);

			getData(div, 'y');
			//console.log(y);
		}

		x += +getData(div, 'speed');
		setData(div, 'x', x);

		div.style.transform = `translate(${x}px, ${y}px)`;
		if (y >= div.parentElement.dataset.height - div.dataset.height) {
			// in caz ca invader-ul ajunge la linia de jos oprim setInterval()

			// si eliminam toate elementele ferestrei, plasand anuntul GAME OVER!

			let invaderus = selector('.invader');
			for (let i = 0; i < invaderus.length; i++) {
				clearInterval(invaderus[i].dataset.interval);
			}
			while (document.body.firstChild) {
				document.body.removeChild(document.body.firstChild);
			}

			let over = newEl('div', 'overAll');
			over.innerText = 'GAME OVER!';
			document.body.appendChild(over);
		}
	}, 100);
}

let score = 0;

function addRocket(x, y) {
	x = x + 38;
	y = y - 45;

	let div = newEl('div', 'rocket');
	$('#map').appendChild(div);
	// plasam info despre 2 cadre ale animatiei
	// in data -> div
	setData(div, 'frames', [ '-450px -369px', '-450px -369px' ]);
	setData(div, 'speed', 5 + parseInt(Math.random() * 5));
	// setData(div, 'width', 80);
	// setData(div, 'height', 80);
	setData(div, 'x', x);
	setData(div, 'y', y);

	div.style.transform = `translate(${x}px, ${y}px)`;

	div.style.backgroundPosition = getData(div, 'frames').split(',')[0];

	let interval = setInterval(() => {
		setData(div, 'interval', interval);

		let frames = getData(div, 'frames').split(',');

		frames.push(frames.shift());

		setData(div, 'frames', frames);

		div.style.backgroundPosition = getData(div, 'frames').split(',')[0];

		// movement
		let x = parseInt(getData(div, 'x'));
		let y = parseInt(getData(div, 'y'));

		///////////////////////////////////////
		// verificam daca rcheta intersecteaza vreun invader
		// trebuie functie ajutatoare
		//let invaders = document.querySelectorAll(".invader");
		let invaders = selector('.invader');
		for (let i = 0; i < invaders.length; i++) {
			let ix = parseInt(getData(invaders[i], 'x'));
			let iy = parseInt(getData(invaders[i], 'y'));
			if (Math.abs(x - ix) <= 30 && Math.abs(y - iy) <= 30) {
				score += 100;
				showScore.innerText = `Score: ${score}`;

				clearInterval(div.dataset.interval);
				$('#map').removeChild(div);

				// de oprit timerul
				clearInterval(invaders[i].dataset.interval);
				$('#map').removeChild(invaders[i]);
				//console.log(score);
			}
		}

		document.body.appendChild(showScore);
		///////////////////////////////////////

		// iese oare in afara ferestrei?
		if (y < -50) {
			clearInterval(div.dataset.interval);
			$('#map').removeChild(div);
		}

		y += -getData(div, 'speed');
		setData(div, 'y', y);

		div.style.transform = `translate(${x}px, ${y}px)`;
	}, 10);
}

document.body.appendChild(showScore);

function addPlayer() {
	let div = newEl('div', 'player');
	$('#map').appendChild(div);
	// plasam info despre 2 cadre ale animatiei
	// in data -> div
	//setData(div, 'frames', [ '-345px -1119px']);
	setData(div, 'frames', [ '-351px -1163px' ]);
	setData(div, 'speed', 5 + parseInt(Math.random() * 5));

	setData(div, 'width', 108);
	setData(div, 'height', 71);
	div.style.width = `${div.dataset.width}px`;
	div.style.height = `${div.dataset.height}px`;

	setData(div, 'x', 2);
	setData(div, 'y', 419);

	let x = +getData(div, 'x');
	let y = +getData(div, 'y');

	div.style.transform = `translate(${x}px, ${y}px)`;

	div.style.backgroundPosition = getData(div, 'frames').split(',')[0];

	//console.log(y);

	// let invaders = document.querySelectorAll(".invader");

	// for(let i = 0; i < invaders.length; i++) {

	// 	let ix = parseInt(getData(invaders[i], 'x'));
	// 	let iy = parseInt(getData(invaders[i], 'y'));

	// if(Math.abs(x - ix) <= 30 && Math.abs(y - iy) <= 30) {

	// 	// de oprit timerul
	// 	clearInterval(invaders[i].dataset.interval)
	// 	$("#map").removeChild(invaders[i]);
	// }
	// }

	document.body.addEventListener('keydown', (e) => {
		let x = +getData(div, 'x');

		switch (e.key) {
			case 'ArrowLeft':
				// move left
				x -= +getData(div, 'speed');
				break;
			case 'ArrowRight':
				// move right
				x += +getData(div, 'speed');
				break;
			case ' ':
				addRocket(x, y);
				break;
		}

		if (x >= div.parentElement.dataset.width - div.dataset.width - 10) {
			x = 377;
		} else if (x <= 0) {
			x = 2;
		}

		//console.log(x);

		setData(div, 'x', x);
		//setData(div, 'y', y);
		div.style.transform = `translate(${x}px, ${y}px)`;

		let frames = getData(div, 'frames').split(',');

		frames.push(frames.shift());

		setData(div, 'frames', frames);

		div.style.backgroundPosition = getData(div, 'frames').split(',')[0];
	});
}

function addMap(width = 500, height = 500) {
	let div = document.createElement('div');
	div.id = 'map';
	document.body.appendChild(div);

	// memorizam marimea in DATASET
	div.dataset.width = 500;
	div.dataset.height = 500;

	// setam stilul corespunzator
	div.style.width = `${div.dataset.width}px`;
	div.style.height = `${div.dataset.height}px`;

	return div;
}

////////////////////   UTILS   ///////////////////

function newEl(tag, className) {
	let el = document.createElement(tag);
	el.className = className;
	return el;
}

function $(selector) {
	const el = document.querySelector(selector);
	return el;
}

function setData(el, prop, val) {
	el.dataset[prop] = val;
}

function getData(el, prop) {
	return el.dataset[prop];
}

function selector(name) {
	const el = document.querySelectorAll(name);
	return el;
}

//////////////////////////////
addMap();

addInvader();
addInvader();
addInvader();
addInvader();
addInvader();

addPlayer();

// HOMEWORK

// functie pentru Math.random()
// de plasat pe Player in mijlocul #map-ului
