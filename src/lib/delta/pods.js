const { vec2 } = require('gl-matrix')

const podsDelta = (state, inputs, options) => {
  const { pods, walls } = state
  const env = options.environment

  Object.keys(inputs).map(player => {
    // if the player doesn't have a pod, spawn one
    if (!pods[player]) pods[player] = { pos: vec2.create(), speed: vec2.create() }
  })

  Object.keys(pods).map(podId => {
    const pod = { ...pods[podId] }

    const rawInput = inputs[podId] || null
    const inputVector = !rawInput
      ? vec2.create()
      : vec2.fromValues(
        (rawInput.right - rawInput.left) * env.constants.speed,
        (rawInput.down - rawInput.up) * env.constants.speed
      )

    pod.speed = vec2.add(vec2.create(), pod.speed, inputVector) // acceleration applied

    const normalized = vec2.normalize(vec2.create(), pod.speed)
    const friction = vec2.scale(vec2.create(), normalized, -Math.min(vec2.length(pod.speed), env.constants.friction))

    pod.speed = vec2.add(vec2.create(), pod.speed, friction)
    pod.pos = vec2.add(vec2.create(), pod.pos, pod.speed)

    if (pod.pos[0] < -walls[0]) {
      pod.pos[0] = -walls[0]
      pod.speed[0] = -pod.speed[0] * env.constants.wallBounce
    }
    if (pod.pos[0] > walls[0]) {
      pod.pos[0] = walls[0]
      pod.speed[0] = -pod.speed[0] * env.constants.wallBounce
    }
    if (pod.pos[1] < -walls[1]) {
      pod.pos[1] = -walls[1]
      pod.speed[1] = -pod.speed[1] * env.constants.wallBounce
    }
    if (pod.pos[1] > walls[1]) {
      pod.pos[1] = walls[1]
      pod.speed[1] = -pod.speed[1] * env.constants.wallBounce
    }

    pods[podId] = pod
  })

  return pods
}

module.exports = podsDelta
