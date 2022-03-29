import { Request, Response } from "express";
import CreateStudentService from "../services/CreateStudentService";
import listStudentService from "../services/ListStudentService";
import UpgradeStudentService from "../services/UpgradeStudentService";
import AppErrors from "@shared/errors/App.error";
import type {
  studentFullType,
  studentType,
  studentUpdateType,
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
      console.log(save);
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
      console.log(studentShow);
      return response.status(201).json(studentShow);
    } catch (error) {
      throw new AppErrors(`Error delete student ${error}`);
    }
  }
}
