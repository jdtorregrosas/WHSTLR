'use strict'

function ErrorW(message) {
  this.name = 'WHSTLR Error'
  this.message = message || 'Unkown Error'
  this.stack = Error.prototype.stack
}

ErrorW.prototype = Object.create(Error.prototype)
ErrorW.prototype.constructor = ErrorW

module.exports = ErrorW
