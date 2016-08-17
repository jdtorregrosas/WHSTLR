'use strict'

const formatLine = require('../app/formatLine')
const assert = require('assert')

describe('# Format Line', () => {
  const wrongLines = [
    '- Test',
    ' Test',
    '  Test',
    ' - Test',
    '# Test',
    '### Test',
    '# # # Test',
    '    # - # - * Test'
  ]
  const correctLine = 'Test'
  for (let line in wrongLines) {
    it('Should remove spaces and special chars at the beginning of a line correctly the line', () => {
      assert.deepEqual(formatLine(wrongLines[line]), correctLine)
    })
  }
  const wrongLinesWithSpecialChars = [
    '- Test-* #',
    ' Test-* #',
    '  Test-* #',
    ' - Test-* #',
    '# Test-* #',
    '### Test-* #',
    '# # # Test-* #',
    '    # - # - * Test-* #'
  ]
  const correctLineWithSpecialChars = 'Test-* #'
  for (let line in wrongLinesWithSpecialChars) {
    it('Should not remove spaces and special chars that are not at the beginning of a line correctly the line', () => {
      assert.deepEqual(formatLine(wrongLinesWithSpecialChars[line]), correctLineWithSpecialChars)
    })
  }
})
