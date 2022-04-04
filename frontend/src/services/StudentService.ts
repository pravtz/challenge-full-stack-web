import api from "./api";

export default {
  async createStudent(studentData: string) {
    try {
      const response = await api().post("/student/enrollment", studentData);
      return response.data;
    } catch (error) {
      return new Error(`Error: ${error}`);
    }
  },
  async getAllStudent() {
    try {
      const response = await api().get("/student/enrollment");
      return response.data;
    } catch (error) {
      return new Error(`Error getAllStudent: ${error}`);
    }
  },
  async getStudentRA(ra: string) {
    try {
      const response = await api().get(`/student/enrollment/${ra}`);
      return response.data;
    } catch (error) {
      return new Error(`Error: ${error}`);
    }
  },
  async updateStudent(ra: string, studentData: string) {
    try {
      const response = await api().put(
        `/student/enrollment/${ra}`,
        studentData
      );
      console.log(response);

      return response.data;
    } catch (error) {
      return new Error(`Error: ${error}`);
    }
  },

  async getSearchAll(key: string, value: string) {
    try {
      const obj = {
        key: key,
        value: value,
      };
      const response = await api().post(`/student/enrollment/search`, obj);
      console.log(response);
      return response.data;
    } catch (error) {
      return new Error(`Error: ${error}`);
    }
  },
  async deleteStudent(ra: string) {
    try {
      const response = await api().delete(`/student/enrollment/${ra}`);
      return response.data;
    } catch (error) {
      return new Error(`Error: ${error}`);
    }
  },
};
