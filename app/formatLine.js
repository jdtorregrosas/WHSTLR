'use strict'

module.exports = function (line) {
  return line.trim().replace(/[^A-Za-z]*/, '')
}
