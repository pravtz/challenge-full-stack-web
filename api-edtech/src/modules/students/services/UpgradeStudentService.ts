import type {
  studentFullType,
  studentUpdateType,
} from "./../repositories/IStudent";
import { StudentRepository } from "../repositories/StudentRepository";
import AppErrors from "@shared/errors/App.error";


export default class UpgradeStudentService {
  async execute({ ra, name, email, cpf }: studentUpdateType) {
    
    const repository = new StudentRepository();
    const estudentExist = await repository.existFromRa(ra)
    
    if(!estudentExist){
        throw new AppErrors("non-existing student", 401)
    }
    const studentUpdate = await repository.update({
      ra,
      name,
      email,
      cpf,
    });
    return studentUpdate;
  }
}
