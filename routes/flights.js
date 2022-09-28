import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

//GET /flights/index
router.get('/index', flightsCtrl.index)
//GET /flights/new
router.get('/new', flightsCtrl.new)
//GET /flights/:id
router.get('/:id', flightsCtrl.show)
//GET /flights/:id/edit
router.get('/:id/edit', flightsCtrl.edit)
//POST /flights
router.post('/', flightsCtrl.create)
//POST /flights/:id/tickets
router.post('/:id/tickets', flightsCtrl.createTicket)
//PUT /flights/:id
router.put('/:id', flightsCtrl.update)
//DELETE /flights/:id
router.delete('/:id', flightsCtrl.delete)

export {
  router
}
