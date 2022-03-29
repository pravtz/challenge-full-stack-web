import { celebrate, Segments, Joi } from "celebrate"

const DeleteStudentValidate = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    raKey: Joi.string().required(),
  })
})

export default DeleteStudentValidate