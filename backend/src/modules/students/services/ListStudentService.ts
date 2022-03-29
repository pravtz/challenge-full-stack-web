import { StudentRepository } from "../repositories/StudentRepository";

export default class ListStudentService {
    async execute(){
        const repository = new StudentRepository
        const students = await repository.findAll()
        return students
    }
}