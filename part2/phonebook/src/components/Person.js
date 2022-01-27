import React from 'react'

const Person = ({person,handleDelete}) =>{
  return(
    <div className='persondiv2'  key={person.id}>
    <p key={person.id}>{person.name} {person.number}<button id={person.id} onClick={handleDelete}>delete</button></p> 

    </div>
  )
}

export default Person