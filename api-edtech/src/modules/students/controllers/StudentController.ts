import { Request, Response } from "express";
import CreateStudentService from "../services/CreateStudentService";
import listStudentService from "../services/ListStudentService";
import UpgradeStudentService from "../services/UpgradeStudentService";
import SelectCustomService from "../services/SelectCustomService";
import SelectAllCustomService from "../services/SelectAllCustonService";
import ValidateEmailAndCpfService from "../services/ValidateEmailAndCpfService";
import AppErrors from "@shared/errors/App.error";
import type {
  studentFullType,
  studentType,
  studentUpdateType,
  studentSelectCustom
} from "./../repositories/IStudent";
import ShowStudentService from "../services/ShowStudentService";
import DeleteStudentService from "../services/DeleteStudentService";

export default class StudentController {
  public async index(request: Request, response: Response) {
    const students = new listStudentService();
    try {
      const list = await students.execute();
      return response.status(200).json(list);
    } catch (error) {
      throw new AppErrors(`Error list student: ${error}`);
    }
  }

  public async store(request: Request, response: Response) {
    const students = new CreateStudentService();
    try {
      const data: studentType = request.body;

      const save = await students.execute(data);
      return response.status(201).json({ ra: save.ra });
    } catch (error) {
      throw new AppErrors(`Error create student ${error}`);
    }
  }
  public async selectCustom(request: Request, response: Response){
    const student = new SelectCustomService()
    try {
      const {ra, name, email, cpf}:studentSelectCustom = request.body;
      const students = await student.execute({ ra, name, email, cpf })
      console.log(` controller = ra ${ra}, name ${name}, email ${email}, cpf ${cpf}`)
      return response.status(200).json(students);
    } catch (error) {
      throw new AppErrors(`Error create student ${error}`);
    }
  }
  public async selectCustomAll(request: Request, response: Response){
    const student = new SelectAllCustomService()
    try {
      const {key, value} = request.body;
      const students = await student.execute(key, value)
     
      return response.status(200).json(students);
    } catch (error) {
      throw new AppErrors(`Error create student ${error}`);
    }
  }

  public async show(request: Request, response: Response) {
    const student = new ShowStudentService();
    try {
      const { raKey } = request.params;
      const ra = Number(raKey);
      const studentShow = await student.execute(ra);
      return response.status(200).json(studentShow);
    } catch (error) {
      throw new AppErrors(`Error show student ${error}`);
    }
  }

  public async update(request: Request, response: Response) {
    const students = new UpgradeStudentService();
    try {
      const { raKey } = request.params;
      const ra = Number(raKey);
      const { name, email, cpf }: studentType = request.body;
      const save = await students.execute({ ra, name, email, cpf });
      
      return response.status(201).json({ ra: save.ra });
    } catch (error) {
      throw new AppErrors(`Error update student ${error}`, 500);
    }
  }
  public async delete(request: Request, response: Response) {
    const student = new DeleteStudentService();
    try {
      const { raKey } = request.params;
      const ra = Number(raKey);
      const studentShow = await student.execute(ra);
      return response.status(201).json(studentShow);
    } catch (error) {
      throw new AppErrors(`Error delete student ${error}`);
    }
  }
  public async existEmailAndCpf(request: Request, response: Response){
    const studentExist = new ValidateEmailAndCpfService()
    const {email, cpf} = request.body;
    const valid = await studentExist.execute(email,cpf);
    return response.status(201).json(valid)
  }
}
