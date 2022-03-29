import {Router} from 'express'
import studentRoutes from '@modules/students/routes/student.routes'

const mainRoutes = Router()

// this is modules routes
mainRoutes.use('/student/enrollment', studentRoutes)

export default mainRoutes