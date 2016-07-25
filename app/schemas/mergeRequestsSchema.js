'use strict'

const Joi = require('joi')

const mergeRequestsSchema = Joi.array().items(Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string().required(),
  source_branch: Joi.string().required(),
  description: Joi.string().allow(''),
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
