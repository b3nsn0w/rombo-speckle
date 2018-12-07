const inputState = {
  up: false,
  down: false,
  left: false,
  right: false
}

const keybinds = {
  up: ['w', 'ArrowUp'],
  down: ['s', 'ArrowDown'],
  left: ['a', 'ArrowLeft'],
  right: ['d', 'ArrowRight']
}

const pressedKeys = new Set()

window.addEventListener('keydown', event => {
  const key = event.key
  if (!pressedKeys.has(key)) pressedKeys.add(key)
  updateState()
})

window.addEventListener('keyup', event => {
  const key = event.key
  pressedKeys.delete(key)
  updateState()
})

function updateState () {
  Object.keys(keybinds).map(command => {
    const binds = keybinds[command]
    const pressed = Boolean(binds.filter(key => pressedKeys.has(key)).length)

    inputState[command] = pressed
  })
}

module.exports = () => ({ ...inputState })
