import { celebrate, Segments, Joi } from "celebrate"

const ShowStudentValidate = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    raKey: Joi.string().required(),
  })
})

export default ShowStudentValidate
