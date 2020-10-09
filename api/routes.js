import { Router } from 'express'
import userController from './controllers/user'
import userStatusController from './controllers/user_status'

const router = Router()

router.post('/user', userController.createUser)
router.get('/user', userController.getUser)
router.get('/status', userStatusController.getUserStatus)

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

export default router
