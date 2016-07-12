'use strict'

const Joi = require('joi')

const projectsSchema = Joi.array().items(Joi.object().keys({
  name: Joi.string().required(),
  tags: Joi.array().items(Joi.object().keys({
    name: Joi.string().required(),
    date: Joi.string().required()
  })).required()
}))

module.exports = {
  validateProjects: (projects) => {
    return Joi.validate(projects, projectsSchema, (err, projects) => {
      if (err) {
        throw new Error(err)
      } else {
        return projects
      }
    })
  }
}
