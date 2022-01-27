import React, {useEffect, useState } from 'react'

import Forms from './components/Forms'
import Person from './components/Person'
import Filter from './components/Filter'
import personsServices from './services/persons'
import Notification from './components/ErrorNotifications'



const App = () => {
  // useState Hook
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Add Person..')
  const [newNumb, setNumb] = useState('')
  const [filter, setFilter] = useState('')
  const [alert, setAlert] = useState(null)
  const [alerttype, setAlertType] = useState(null)
  const [isPending, setIsPending] = useState(true)


  useEffect (() => {
    console.log('effect')
    setTimeout (() => {
      personsServices
      .getAll()
      .then(initialPersons => {
        //console.log(initialPersons)
        setPersons(initialPersons)
        setIsPending(false)
      })
    },1000)
    
  }, [])
  //console.log('render', persons.length, 'persons')
  //filter for search.
  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

//checking exact person 
  const hasExactMatch = persons.some((person) => {
    return person.name.toLowerCase() === newName.toLowerCase();
  });
  
 //add person if not already exist --> addPerson()

  const addPerson = (e) => {
    e.preventDefault()
    const person = persons.find((p) => p.name.toLowerCase() === newName.toLowerCase());
    //console.log(person)
    

    let updateOrnot;
    if(hasExactMatch && newNumb !== ''){
      updateOrnot =window.confirm(`${newName} is already added to phonebook, replace the old number? `);
    }
    if(updateOrnot){
      
      const updatedPerson = { ...person, number: newNumb };
      const id = person.id;
      personsServices
        .update(id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson.data)));
          
          setAlertType('info')
          setAlert(`'${person.name} 'Phone Number '${person.number}' is changed with '${updatedPerson.number}' Phone Number`)
          setTimeout(() =>{
            setAlert(null)
            setAlertType(null)
          }, 5000)
          setNewName('')
          setNumb('')
        })
    
      }else if(!updateOrnot && person !== undefined && newNumb !=='') {
        console.log('reject')
        setNewName('')
        setNumb('')
        setAlertType('info')
        setAlert(`User didnt wanted to change Current number ${newName}`)
        setTimeout(() =>{
          setAlert(null)
          setAlertType(null)
        }, 5000)
      }
      
      
      if(!hasExactMatch && newName !== '' && newNumb !== ''){

      
          const newPerson = {
            
            name: newName,
            number: newNumb
          }
          personsServices 
            .create(newPerson)
            .then(returndPerson => {
              setPersons(persons.concat(returndPerson.data))
            
              setAlertType('success')
              setAlert(
                `${newPerson.name} has added to your phonebook`
              )
              setTimeout(() =>{
                setAlert(null)
                setAlertType(null)
              }, 5000)
              setNewName('')
              setNumb('')
            })
          }
  }
 
 
const personDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if(window.confirm(`Delete ${person.name}?`)){
      personsServices
        .deletePerson(id)
        .then(() => {
          
            setPersons(persons.filter(p => p.id !== id))
            setAlertType('info')
              setAlert(
                `${person.name} has deleted`
              )
              setTimeout(() =>{
                setAlert(null)
                setAlertType(null)
              }, 5000)
          })
        .catch(error => {
          setAlert(
            `Person '${person.name}' is already deleted`
          )
          setAlertType('error')
          setTimeout(() =>{
            setAlert(null)
          }, 5000)
        })
  
    }
    
  
 }

  return (
    <div className='mainDiv'>
      <div className='notDiv' >
        <Notification message={alert} type={alerttype}/>
       </div>
      <div className='elemDiv'>
      
      <div className='leftDiv'>
          <h2>Phonebook</h2>
          
          {/* Filter Search form*/}
          <Filter handleFilterChange={e => setFilter(e.target.value)} value={filter} />
          
          
          <div className='inputDiv'>
          <h3>Add a new</h3>
          

          {/*Input forms for phone and name */}
          <Forms  onSubmit={addPerson}
            changeName={e=>setNewName(e.target.value)}
            changeNumb={e =>setNumb(e.target.value)}
            nameVal={newName}
            numberVal ={newNumb}
            
          />
          </div>
      </div>  
      <div className='personDiv'>
          <h2>Numbers</h2>
          
          {/* Existing persons(and filtered)*/}
          {isPending && <p>Loading</p>}
          {filteredPersons.map(person => 
          <Person 
            key={person.id} 
            person={person} 
            handleDelete= {()=>personDelete(person.id)}
          
          />)}
          </div>
       </div>
       
       
    </div>
  )
}

export default App 