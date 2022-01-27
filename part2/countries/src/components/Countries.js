import React from "react"
import Weather from "./Weather"
const Countries = ({countries}) => {
  
    return(
      <div>
          <h1> {countries[0]}</h1>
          <p>Capital {countries.capital}</p>
          <p>Popualtion {countries.population}</p>
          <ul>
            <h3>languages</h3>
  
            { Object.keys(countries.languages).map(lan => 
      
      <li key={lan}>{countries.languages[lan]}</li>
  
    )}
        
        
          </ul>
          <div>
           
            <img alt="flags countries" width={"150px"} src={countries.flags.png}></img>
          </div>

          <Weather weth={countries.capital}/>
      </div>
      
    )
  }
  export default Countries 