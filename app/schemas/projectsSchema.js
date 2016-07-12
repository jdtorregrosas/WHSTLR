'use strict'

const Joi = require('joi')

const projectsSchema = Joi.array().items(Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required()
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
