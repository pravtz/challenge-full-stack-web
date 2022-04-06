import { validedDocumentCPF } from "../../../shared/utils/validateCustom";
import { celebrate, Segments, Joi } from "celebrate";

const UpdateStudentValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().custom(validedDocumentCPF).required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    raKey: Joi.string().required(),
  }),
});

export default UpdateStudentValidate