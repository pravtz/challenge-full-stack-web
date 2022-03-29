import { Router } from 'express'

import StudentController from '../controllers/StudentController'

// validations
import CreateStudentValidate from '../validation/CreateStudentValidate'
import ShowStudentValidate from '../validation/ShowStudentValidate'
import UpdateStudentValidate from '../validation/UpdateStudentValidate'
import DeleteStudentValidate from '../validation/DeleteStudentValidate'

const StudentRoutes = Router()
const studentController = new StudentController()

StudentRoutes.get('/',studentController.index)
StudentRoutes.post('/',CreateStudentValidate,studentController.store)
StudentRoutes.get('/:raKey',ShowStudentValidate,studentController.show)
StudentRoutes.put('/:raKey',UpdateStudentValidate,studentController.update)
StudentRoutes.delete('/:raKey',DeleteStudentValidate,studentController.delete)

export default StudentRoutes