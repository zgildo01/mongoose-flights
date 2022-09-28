import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js";

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function newFlight(req, res) {
  const newFlight = new Flight()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate: departsDate
  })
}

function create(req, res) {
	for (let [key] in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect('/flights/index')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    console.log(flight)
    res.redirect('/flights/index')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/index')
  })
}

//UNSURE IF ITS MEALS OR MEAL
function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Detail', 
        flight,
        meals,
      })
    })
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function update(req, res) {
  for (let [key] in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(flight => {
    res.redirect(`/flights/${req.params.id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function addToMeals(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  addToMeals,
}