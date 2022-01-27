const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://kutso:${password}@cluster0.p3fnd.mongodb.net/phonebook-0?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Persons = mongoose.model('Persons', personSchema)

const person = new Persons({
  name: 'HTML is Easy',
  number: 1234
})
Persons.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

// person.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })