'use strict'

const Joi = require('joi')

const commitSchema = Joi.array().items(Joi.object().keys({
  id: Joi.string().required(),
  message: Joi.string().required(),
  author: Joi.string().required(),
  date: Joi.string().required(),
  path: Joi.string().required(),
  mergeid: Joi.string()
}))

module.exports = {
  validateCommits: (commit) => {
    return Joi.validate(commit, commitSchema, (err, commit) => {
      if (err) {
        throw new Error(err)
      } else {
        return commit
      }
    })
  }
}
