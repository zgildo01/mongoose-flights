import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

//GET /flights/index
router.get('/index', flightsCtrl.index)
//GET /flights/new
router.get('/new', flightsCtrl.new)
//POST /flights
router.post('/', flightsCtrl.create)

export {
  router
}
