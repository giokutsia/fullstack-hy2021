import React from 'react'
import Countries from './Countries'


const Country= ({country,handleClick}) =>{
  const singleCountry = country.length === 1;
  const matches = country.length <= 10 && country.length > 1
  return(
    <div>
      {matches && 
      country.map( i =>
      <div key={i.name.common}>
        {i.name.common } <button onClick={handleClick} id={i.name.common}>show</button>
        
      </div>)}
      
      {singleCountry &&
      <Countries countries={country[0]} />}
    </div>
  )
}

export default Country 