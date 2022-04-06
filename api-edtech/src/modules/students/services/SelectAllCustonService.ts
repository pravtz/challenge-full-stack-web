
import { StudentRepository } from "../repositories/StudentRepository";

export default class SelectAllCustomService {
    async execute(key: string, value: string){
        const repository = new StudentRepository
        const students = await repository.searchAll(key, value)
       
        return students
    }
}