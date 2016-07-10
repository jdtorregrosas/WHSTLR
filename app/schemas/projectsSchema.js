'use strict'

const Joi = require('joi')

const projectsSchema = Joi.array().items(Joi.object().keys({
  name: Joi.string().required()
}))

module.exports = {
  validateProjects : (projects) => {
    return Joi.validate(projects, projectsSchema, (err, projects) => {
      if(err) {
        console.log(err)
        return err
      } else {
        return projects
      }
    })
  }
}
