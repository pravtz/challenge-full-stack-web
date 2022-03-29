import AppErrors from "@shared/errors/App.error";
import type { studentType } from "../repositories/IStudent";
import { StudentRepository } from "../repositories/StudentRepository";

export default class CreateStudentService {

   async execute({name, email, cpf}: studentType){
    const repository = new StudentRepository

    const estudentExist = await repository.exist(cpf)
    if(estudentExist){
        throw new AppErrors("There is already a student with this CPF", 401)
    }
    const studant = await repository.create({
        name,
        email,
        cpf
    })
    return studant
   }
}