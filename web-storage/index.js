let messages = [];
function sendMessage() {
	let input = document.getElementById('message-input');
	let message = input.value;
	input.value = '';

	let badWords = [ 'kuku', 'muku', 'puku' ];
	for (let i = 0; i < badWords.length; i++) {
		if (message == badWords[i]) {
			alert('What are you writing?');
			message = '';
		}
	}

	if (message == '' || message == ' ') {
		alert('Enter valid text!');
	} else {
		messages.push(message);
	}

	renderMessages();
	saveMessages();
}
let messageList = document.getElementById('message-list');
function renderMessages() {
	messageList.innerHTML = '';

	for (let i = 0; i < messages.length; i++) {
		messageList.innerHTML += `${messages[i]}<br>`;
	}
}

function saveMessages() {
	localStorage.setItem('messages', messages);
}

function loadMessages() {
	if (messages.length) {
		renderMessages();
		messages = localStorage.getItem('messages').split(',');
	}
}

function del() {
	localStorage.removeItem('messages');
	messageList.innerHTML = '';
}
