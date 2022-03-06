const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.send('<h1>Hello</h1>');
});

setInterval(() => {
  console.log('Interval happened', new Date());
  io.sockets.emit('greetings', { data: { text: 'hello' }, number: 5 });
}, 5000);

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.RASPI_SERVICE_PORT ?? 3003;
http.listen(port, function () {
  console.log(`listening on *:${port}`);
});
