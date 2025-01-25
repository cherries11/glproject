import express from 'express'
import { workerList,loginWorker ,appointmentsWorker,appointmentCancel,appointmentComplete,workerdashboard,workerprofile,updateWorkerprofile} from '../controllers/workerController.js'
import authWorker from '../middlewares/authWorker.js'

const workerRouter=express.Router()

workerRouter.get('/list',workerList)
workerRouter.post('/login',loginWorker)
workerRouter.get('/appointments',authWorker,appointmentsWorker)
workerRouter.post('/complete-appointment',authWorker,appointmentComplete)
workerRouter.post('/cancel-appointment',authWorker,appointmentCancel)
workerRouter.get('/profile',authWorker,workerprofile)
workerRouter.post('/update-profile',authWorker,updateWorkerprofile)


export default workerRouter
