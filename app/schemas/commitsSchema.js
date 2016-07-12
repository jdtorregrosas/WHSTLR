'use strict'

const Joi = require('joi')

const commitSchema = Joi.array().items(Joi.object().keys({
  title: Joi.string().required(),
  body: Joi.string().required(),
  author: Joi.string().required(),
  date: Joi.string().required()
}))

module.exports = {
  validateCommits: (commit) => {
    return Joi.validate(commit, commitSchema, (err, commit) => {
      if (err) {
        console.log(err)
        return err
      } else {
        return commit
      }
    })
  }
}
