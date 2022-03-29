import { StudentRepository } from "../repositories/StudentRepository";

export default class ShowStudentService {
    async execute(ra: number){
        const repository = new StudentRepository
        const students = await repository.find(ra)
        return students
    }
}