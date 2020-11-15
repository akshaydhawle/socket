const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000;
http.listen(port, () => console.log(`server listening on port ${port}`));

// io.on('connection', (socket) => {
// 	socket.emit('msg', 'server started .....');

// 	socket.on('comments', () => {
// 		const comments = [{ comment: 'nice mobile' }, { comment: 'good mobile' }];
// 		socket.emit('comments', comments);
// 	});
// });

// let rooms = ['pledger', 'seso', 'hypercream'];

// io.of('/Neosoft').on('connection', (socket) => {
// 	socket.emit('Welcome', 'somebody joined');

// 	socket.on('joinRoom', (room) => {
// 		if (rooms.includes(room)) {
// 			socket.join(room);
// 			io.of('/Neosoft').in(room).emit('newUser', `new player has been joined in  ${room}`);
// 			return socket.emit('success', true);
// 		} else return socket.emit('success', false);
// 	});
// });

let rooms = ['group1', 'group2', 'group3'];
let users = [];

io.of('/chat').on('connection', (socket) => {
	// unique id for user to send messages.
	console.log(socket.id);
	users.push(socket.id);

	socket.emit('Welcome', 'somebody joined');

	socket.on('msg-r', (id) => {
		io.to(id).emit('msg-r', 'I just met you');
	});

	socket.on('joinRoom', (room) => {
		if (rooms.includes(room)) {
			socket.join(room);
			io.of('/chat').in(room).emit('newUser', `new player has been joined in  ${room}`);
			return socket.emit('success', true);
		} else return socket.emit('success', false);
	});
});
