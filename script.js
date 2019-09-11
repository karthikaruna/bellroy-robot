/* Tested in Chrome and Firefox */
Element.prototype.getComputedStyle = function (property) {
  return parseFloat(getComputedStyle(this)[property], 10)
}

// Enum
const FaceDirection = Object.freeze({
  Down: 0,
  Left: 1,
  Up: 2,
  Right: 3
})

const KeyCode = Object.freeze({
  ArrowDown: 'ArrowDown'
})

// Robot
class Robot {
  constructor() {
    this.face = 0
  }

  move() {
    const robot = Robot.element

    switch (this.face) {
      case FaceDirection.Down:
        if (Math.floor(robot.getComputedStyle('bottom')) === 0) return
        robot.style.top = robot.getComputedStyle('top') + cellWidth + 'px'
        break

      case FaceDirection.Left:
        if (Math.floor(robot.getComputedStyle('left')) === 0) return
        robot.style.left = robot.getComputedStyle('left') - cellWidth + 'px'
        break

      case FaceDirection.Up:
        if (Math.floor(robot.getComputedStyle('top')) === 0) return
        robot.style.top = robot.getComputedStyle('top') - cellWidth + 'px'
        break

      case FaceDirection.Right:
        if (Math.floor(robot.getComputedStyle('right')) === 0) return
        robot.style.left = robot.getComputedStyle('left') + cellWidth + 'px'
    }
  }

  rotate() {
    const robot = Robot.element

    this.face = (this.face + 1) % 4
    robot.style.transform = `rotate(${this.face * 90}deg)`
  }
}
Robot.element = document.querySelector('.robot')

// Interactions
const robot = new Robot(),
  grid = document.querySelector('.grid'),
  cellWidth = grid.getComputedStyle('width') / 5

// Initialize robot's dimensions
Robot.element.style.width = cellWidth + 'px'
Robot.element.style.height = cellWidth + 'px'

// Listen to arrow keys
document.addEventListener('keydown', function (event) {
  if (event.shiftKey && event.code === KeyCode.ArrowDown) {
    robot.rotate()
  } else if (event.code === KeyCode.ArrowDown) {
    robot.move()
  }
})

document.addEventListener('click', function (event) {
  if (event.target.closest('.move')) {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: KeyCode.ArrowDown }))
  } else if (event.target.closest('.rotate')) {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: KeyCode.ArrowDown, shiftKey: true }))
  }
})