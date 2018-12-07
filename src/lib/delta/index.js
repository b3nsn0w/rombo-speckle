const podsDelta = require('./pods')

const delta = (state, inputs, options) => {
  // const { x, y } = state
  // const env = options.environment

  // const speed = inputs.player == null
  //   ? { x: 0, y: 0 }
  //   : {
  //     x: (inputs.player.down - inputs.player.up) * env.constants.speed,
  //     y: (inputs.player.right - inputs.player.left) * env.constants.speed
  //   }

  // return {
  //   x: x + speed.x,
  //   y: y + speed.y
  // }

  const { walls } = state

  return {
    pods: podsDelta(state, inputs, options),
    walls
  }
}

module.exports = delta
