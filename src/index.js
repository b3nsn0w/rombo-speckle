import './index.styl'

const Deltasnare = require('deltasnare')

const input = require('./lib/inputs')
const delta = require('./lib/delta')
const render = require('./lib/render')

const env = {
  constants: {
    speed: 0.2,
    friction: 0.04,
    wallBounce: 0.4
  }
}

const deltasnare = new Deltasnare(delta, {
  environment: env
})
const container = document.querySelector('#container')

const canvas = container.querySelector('canvas#game-canvas')
const context = canvas.getContext('2d')

deltasnare.on('tick', () => {
  deltasnare.setInput(input())
})

deltasnare.on('frame', (state) => {
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = rect.height * window.devicePixelRatio

  render(context, state)
})

deltasnare.startSingleplayer({
  pods: {},
  walls: [800, 600]
})
