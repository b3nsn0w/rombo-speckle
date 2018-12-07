const { vec2, mat2d } = require('gl-matrix')

const renderGame = (context, state) => {
  const { pods, walls } = state
  const canvas = context.canvas

  const horizontalRatio = canvas.width / (walls[0] * 2)
  const verticalRatio = canvas.height / (walls[1] * 2)

  const ratio = Math.min(horizontalRatio, verticalRatio)
  const center = [ canvas.width / 2, canvas.height / 2 ]

  const toCanvasTransform = mat2d.multiply(
    mat2d.create(),
    mat2d.fromTranslation(mat2d.create(), center),
    mat2d.fromScaling(mat2d.create(), [ratio, ratio])
  )
  // const toGameTransform = mat2d.invert(mat2d.create(), toCanvasTransform)

  const toCanvas = point => vec2.transformMat2d(vec2.create(), point, toCanvasTransform)

  const podSize = 42 * ratio

  context.fillStyle = '#000'

  Object.keys(pods).map(podId => {
    const pod = pods[podId]
    const location = toCanvas(pod.pos)

    context.beginPath()
    context.arc(location[0], location[1], podSize, 0, Math.PI * 2)
    context.fill()
  })
}

module.exports = renderGame
