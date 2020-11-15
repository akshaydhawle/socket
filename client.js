const io = require('socket.io-client');

const baseUrl = 'http://localhost:3000/';
let socket = io.connect(baseUrl);
let NeosoftChannel = io.connect(`${baseUrl}Neosoft`);
let ChatChannel = io.connect(`${baseUrl}chat`);

// socket.on('msg', (msg) => console.log('client- ', msg));
// socket.on('comments', (msg) => console.log('client- ', msg));

// socket.emit('comments');
NeosoftChannel.emit('joinRoom', 'pledger');

NeosoftChannel.on('Welcome', (data) => console.log(data));
NeosoftChannel.on('newUser', (data) => console.log(data));
NeosoftChannel.on('success', (data) => console.log(data));

ChatChannel.emit('joinRoom', 'group1');

ChatChannel.on('Welcome', (data) => console.log(data));
ChatChannel.on('newUser', (data) => console.log(data));
ChatChannel.on('success', (data) => console.log(data));

ChatChannel.emit('msg-r', '1JoB-PKvvEPLdsY0AAAC');
ChatChannel.on('msg-r', (data) => console.log(data));
