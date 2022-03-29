import { celebrate, Segments, Joi } from "celebrate";
import { validedDocumentCPF } from "../../../shared/utils/validateCustom";


const CreateStudentValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().custom(validedDocumentCPF).required(),
  }),
});

export default CreateStudentValidate;
