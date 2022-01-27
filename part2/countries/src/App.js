import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

//import Person from './components/Person'
//import Filter from './components/Filter'


const App = () => {
  // useState Hook
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('')
  const [hasFilter, setHasFilter] = useState(false);

 
 useEffect(() => {
   //console.log('effect')
   axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      //console.log('promis fulfilled')
      setCountries(response.data)
    })
 }, [])
 //console.log('render', countries.length, 'countries')


//const names = countries.map((cou, i) => cou.name)
//console.log('names',names)





const filteredCountries = countries.filter((country) => 
   (country.name.common.toLowerCase().includes(filter.toLowerCase()))
);
//const names1 = filteredCountries.map(i => i.name)
//console.log(names1)

const hasExactMatch = filteredCountries.some((country) => {
  return country.name.common.toLowerCase() === filter.toLowerCase();
});
//console.log(hasExactMatch)
let exactFilteredCountries;
if (hasExactMatch) {
  exactFilteredCountries = filteredCountries.filter((country) => {
    return country.name.common.toLowerCase() === filter.toLowerCase();
  });
}
//console.log(exactFilteredCountries.name.common)

const tooMuch = filteredCountries.length > 10 //"too much matches"






//console.log('length',filteredCountries.length)
/*const hasMatch = filteredCountries.some((country) =>
(country.name.common.toLowerCase() === filter.toLowerCase()) )
//console.log(hasMatch);*/


 const handleFilterChange =(e) => {
    setFilter(e.target.value)
    if (e.target.value === "")
      setHasFilter(false)
    else
      setHasFilter(true)
  }
 const showHandle = (e) => {
   //console.log("target", e.target.id)
  setFilter(e.target.id)
 }



  return (
    <div>
      <Filter handleFilterChange={handleFilterChange } value={filter}/>
      {!hasFilter &&<h1>Result</h1>}
      {hasFilter && tooMuch && <p>Too much</p>}
     
      {hasFilter  && !hasExactMatch &&
      <div>
        <Country country={filteredCountries}
          handleClick={(e) => showHandle(e)}
        />
        
      </div>  
}
      {hasFilter  && hasExactMatch &&
      <div>
        <Country country={exactFilteredCountries}/>
        
      </div>  
        }
         <div>
          
     
        </div>
     
          
        
    </div>
  )
}

export default App 

