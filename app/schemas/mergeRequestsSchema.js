'use strict'

const Joi = require('joi')

const mergeRequestsSchema = Joi.array().items(Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string().required(),
  source_branch: Joi.string().required(),
  descriptions: Joi.array().items(Joi.string()),
  author: Joi.string().required(),
  date: Joi.string().required(),
  path: Joi.string().required()
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
