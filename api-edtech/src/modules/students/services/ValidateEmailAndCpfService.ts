
import { StudentRepository } from "../repositories/StudentRepository";

export default class ValidateEmailAndCpfService {
    async execute(email: string, cpf: string){
        const repository = new StudentRepository
        const isCpf = await repository.exist(cpf)
        const isEmail = await repository.existEmail(email)
        return {isCpf: !!isCpf, isEmail: !!isEmail}
    }
}