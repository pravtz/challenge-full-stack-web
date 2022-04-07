import { prisma } from "@shared/database/client";
import type { studentType, studentUpdateType, studentFullType } from "./IStudent";
import { IStudentRepository, studentSelectCustom} from "./IStudent";

class StudentRepository implements IStudentRepository {
  async findAll() {
    const students = await prisma.student.findMany();
    return students;
  }
  async create({ name, email, cpf }: studentType) {
    const student = await prisma.student.create({
      data: {
        name,
        email,
        cpf,
      },
    });
    return student;
  }
  async exist(cpf: string) {
    const student = await prisma.student.findUnique({
      where: {
        cpf,
      },
    });
    return !!student;
  }
  async existEmail(email: string) {
    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    });
    return !!student;
  }
  async existFromRa(ra: studentFullType['ra'] ){
      const student = await prisma.student.findUnique({
          where: {
              ra
          }
      })
      return !!student
  }
  async search({ra, name, email, cpf}: studentSelectCustom){
   const students = await prisma.$queryRawUnsafe(
        'SELECT * FROM student WHERE ra = ? OR name LIKE ? OR email LIKE ? OR cpf = ?',
        ra,
        `%${name}%`,
        `%${email}%`,
        cpf
      )
      console.log(`ra ${ra}, name ${name}, email ${email}, cpf ${cpf}`)
      console.log(students)
      return students
    
  }
  async searchAll(key: string, value: string){
    const students = await prisma.$queryRawUnsafe(
         `SELECT * FROM student WHERE ${key} LIKE "%${value}%"`
         )

       return students
   }


  async find(ra: number) {
    const studant = await prisma.student.findFirst({
      where: {
        ra,
      },
    });
    return studant;
  }
  async update({ ra, name, email, cpf }: studentUpdateType) {
    const studant = await prisma.student.update({
      where: {
        ra,
      },
      data: {
        name,
        email,
        cpf,
      },
    });
    return studant;
  }
  async delete(ra: number) {
    const stundat = await prisma.student.delete({
      where: {
        ra,
      },
    });
    return stundat;
  }
}

export { StudentRepository };
