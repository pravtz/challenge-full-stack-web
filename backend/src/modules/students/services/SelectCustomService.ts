import { studentSelectCustom } from './../repositories/IStudent';
import { StudentRepository } from "../repositories/StudentRepository";

export default class SelectCustomService {
    async execute({ra, name, email, cpf}: studentSelectCustom){
        const repository = new StudentRepository
        const students = await repository.search({ra, name, email, cpf})
        console.log(` SErvice = ra ${ra}, name ${name}, email ${email}, cpf ${cpf}`)
        return students
    }
}