const { WebSocket, WebSocketServer } = require('ws')
const { createServer } = require('http')

const server = createServer()
const wss = new WebSocketServer({ noServer: true})

wss.on('connection', function connection(ws, request, client) {
  ws.on('message', function message(data) {
    console.log(`Received message ${data} from user ${client}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('vaginnaaaa', { binary: true });
      }
    })
  });
});

server.on(
  'upgrade', 
  function upgrade(request, socket, head) {
    // console.log(request)
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request)
    })
  
})

server.listen(3000, () => {
  console.log('server listening on port 3000')
})