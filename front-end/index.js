const openBtn = document.querySelector('.open')
const closeBtn = document.querySelector('.close')

openBtn.addEventListener('click', () => {
  const websocket = new WebSocket('ws://localhost:3000/listen')
  websocket.addEventListener('open', function open() {
    websocket.send('penissssssss')
  })
})

// closeBtn.addEventListener('click', () => {

// })