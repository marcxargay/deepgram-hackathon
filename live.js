// Connect to the streaming endpoint.
var establishConnection = function () {
  console.log('Establishing connection.')

  // Configure the websocket connection.
  // This requires ws installed using 'npm i ws'.
  const WebSocket = require('ws')
  socket = new WebSocket('wss://api.deepgram.com/v1/listen', {
    // Replace with your Deepgram project's API Key.
    headers: {
      Authorization: 'Token YOUR_DEEPGRAM_API_KEY',
    },
  })
  socket.onopen = (m) => {
    console.log('Socket opened!')

    // Grab an audio file.
    var fs = require('fs')
    var contents = fs.readFileSync('/path/to/audio/file.wav')

    // Send the audio to the Deepgram API all at once (works if audio is relatively short).
    // socket.send(contents);

    // Send the audio to the Deepgram API in chunks of 1000 bytes.
    chunk_size = 1000
    for (i = 0; i < contents.length; i += chunk_size) {
      slice = contents.slice(i, i + chunk_size)
      socket.send(slice)
    }

    // Send the message to close the connection.
    socket.send(new Uint8Array(0))
  }
  socket.onclose = (m) => {
    console.log('Socket closed.')
  }

  socket.onmessage = (m) => {
    m = JSON.parse(m.data)
    // Log the received message.
    console.log(m)

    // Log just the words from the received message.
    if (m.hasOwnProperty('channel')) {
      let words = m.channel.alternatives[0].words
      console.log(words)
    }
  }
}

var socket = null
establishConnection()
