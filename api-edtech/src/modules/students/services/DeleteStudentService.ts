import type { studentFullType } from "../repositories/IStudent";
import { StudentRepository } from "../repositories/StudentRepository";

export default class DeleteStudentService {
   async execute(ra: studentFullType['ra']){
       const repository = new StudentRepository

       const studentDeleted = await repository.delete(ra)
       return studentDeleted.ra
   } 
}