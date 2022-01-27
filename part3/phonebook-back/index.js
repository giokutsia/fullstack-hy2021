/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const app = express()
const Persons = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

// const res = require('express/lib/response')
// const { request, response } = require('express')
app.use(cors())

app.use(express.json())
app.use(express.static('build'))

const errorHandler = ( error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send( { error: 'malformatted id' } )
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Persons.find({}).then(person => {
    response.json(person)
  })
})
app.get('/api/persons/:id', (request, response) => {
  Persons.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })

})
//   app.get('/info', (request, response) => {

//     //console.log(timeNow)
//     const currentdate = new Date();
//     const currentNumberOfPersons = persons.length
//     console.log("GET " + request.body)
//     response.send(`<p>Phonebook has info for ${currentNumberOfPersons} people</p> <strong>Current request time</strong> ${currentdate}`)
// })
//deleting Person with findByIdAndRemove
app.delete('/api/persons/:id', (request, response, next) => {
  Persons.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

morgan.token('body',  req => JSON.stringify(req.body))

//Adding New  Person POST request
app.post('/api/persons',morgan(':method :url :status :res[content-length] - :response-time ms :res[content] :body'),
  (request, response, next) => {
    const body = request.body
    console.log(body)

    if(!body.name ){
      return response.status(400).json({ error: 'content missing' })
    }

    const newPerson = new Persons ({
      name: body.name,
      number: body.number
    })

    newPerson.save()
      .then(savedPersons => savedPersons.toJSON)
      .then(saveFormattedPersons => {
        response.json(saveFormattedPersons)
      })
      .catch(error => next(error))
    // if(!body.name || !body.number){
    //     return response.status(400).json({
    //         error: 'content missing'
    //     })

    // }
    // const hasExactMatchName = persons.some((person) => {
    //     return person.name.toLowerCase() === body.name.toLowerCase();
    //   });
    //   const hasExactMatchNumber = persons.some((person) => {
    //     return person.number === body.number;
    //   });


    // if(hasExactMatchName || hasExactMatchNumber){
    //     return response.status(400).json({
    //         error: 'name and number must be unique '
    //     })

    // }
    // const person = {
    //     name: body.name,
    //     number: body.number,
    //     id: generateId(),
    // }
    // persons = persons.concat(person)
    // response.json(persons)
    // console.log(body.name)

  })
// Uodating Exacting Person Number
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  //console.log('person',body, request.params.id)
  Persons.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(personUpdated => {
      console.log(personUpdated)
      response.json(personUpdated)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  console.log('broken link unknown endpoint')
}

app.use(unknownEndpoint)
app.use(errorHandler)
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)