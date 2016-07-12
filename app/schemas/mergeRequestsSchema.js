'use strict'

const Joi = require('joi')

const mergeRequestsSchema = Joi.array().items(Joi.object().keys({
  title: Joi.string().required(),
  link: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  date: Joi.string().required()
}))

module.exports = {
  validateMergeRequests: (mergeRequests) => {
    return Joi.validate(mergeRequests, mergeRequestsSchema, (err, mergeRequests) => {
      if (err) {
        throw new Error(err)
      } else {
        return mergeRequests
      }
    })
  }
}
