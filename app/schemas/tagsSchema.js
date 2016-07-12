'use strict'

const Joi = require('joi')

const tagsSchema = Joi.array().items(Joi.object().keys({
  name: Joi.string().required(),
  date: Joi.string().required()
}))

module.exports = {
  validateTags: (tags) => {
    return Joi.validate(tags, tagsSchema, (err, tags) => {
      if (err) {
        throw new Error(err)
      } else {
        return tags
      }
    })
  }
}
