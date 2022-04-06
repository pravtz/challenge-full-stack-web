import app from './app';
import {logger} from '../utils/logger'

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
  logger.info(`🚀 Server started on port ${PORT}!`)
})