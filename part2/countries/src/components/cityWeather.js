import React from 'react'


const CityWeather = ({input}) => {
//const newObj = Object.keys (input).map(i => input[i])
//console.log('new obj',newObj[1])
//console.log('isAraay?',Array.isArray(newObj))
//console.log('isAraay?',Array.isArray(input))
//console.log('input',input)
//console.log('input', Object.keys (input.coord))
function  toTextualDescription(degree){
    if (degree>337.5) return 'North';
    if (degree>292.5) return 'NW';
    if(degree>247.5) return 'West';
    if(degree>202.5) return 'SW';
    if(degree>157.5) return 'South';
    if(degree>122.5) return 'SE';
    if(degree>67.5) return 'East';
    if(degree>22.5){return 'NE';}
    return 'Northerly';
}
    return(
        <div>
            <h3>Weather in {input.name}</h3>
            
            
          { input.main&& 
          <div>
          <p>{input.weather[0].description}</p>
          <p>Temperature{input.main.temp}</p>
          </div>
          }
             
            {input.weather&&<img
            alt={"Weather icon"}
            src={`http://openweathermap.org/img/wn/${input.weather[0].icon}@2x.png`}
          ></img>}
          { input.wind &&
          <p><strong>Wind </strong>{input.wind.speed} mph  <strong>{toTextualDescription(input.wind.deg)}</strong></p>}
        </div>
    )
}
export default CityWeather