const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const si = require('systeminformation');

app.get('/', function (req, res) {
  
  res.sendFile(__dirname + '/index.html');
});

setInterval(async() => {
  const data = await si.cpu();
  console.log('Interval happened', new Date());
  console.log(data);
  io.sockets.emit('cpu', data);
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
