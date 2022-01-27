import React, { useState } from 'react'

import Forms from './components/Forms'
import Person from './components/Person'
import Filter from './components/Filter'

const App = () => {
  // useState Hook
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'}
  ]) 
  const [newName, setNewName] = useState('Add Person..')
  const [newNumb, setNumb] = useState('')
  const [filter, setFilter] = useState('')

  //filter for search.
  const filteredPersons = filter === ''
  ? persons
  :persons.filter(person => person.name.toLowerCase()  === filter.toLowerCase())

 //add person if not already exist --> addPerson()
  const addPerson = (e) => {
    e.preventDefault()

   //Checking existing person 
    persons.forEach(i => {
      if(i.name === newName || i.number === newNumb){
        console.log(true)
        alert(`${newName} or ${newNumb} is already added to phonebook `);
      }else {
          const newPerson = {
            name: newName,
            number: newNumb
          }
          setPersons(persons.concat(newPerson))
        }
    })
        setNewName('')
        setNumb('')
}
 

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter Search form*/}
      <Filter handleFilterChange={e => setFilter(e.target.value)} value={filter} />
      
      <h3>Add a new</h3>
      <div>debug: {newName}</div>

      {/*Input forms for phone and name */}
      <Forms  onSubmit={addPerson}
        changeName={e=>setNewName(e.target.value)}
        changeNumb={e =>setNumb(e.target.value)}
        nameVal={newName}
        numberVal ={newNumb}
      />
    
      <h2>Numbers</h2>
      {/* Existing persons(and filtered)*/}
      {filteredPersons.map(person => 
       <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App 