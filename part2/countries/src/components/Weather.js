import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CityWeather from './cityWeather'
const Weather = ({weth}) => {
    const [weather, setWeather] = useState([])

  
    const api_key=process.env.REACT_APP_API_KEY
  
   
    useEffect(() => {


        //console.log('effect')
        axios
         .get('http://api.openweathermap.org/data/2.5/weather?q='+ weth +'&units=metric&appid=' +api_key)
         .then(response => {
           //console.log('promis fulfilled')
           setWeather(response.data)
         })
      }, [])

 
      
   
       return(


        <div>
          <h1>weather</h1>
         
        <CityWeather input={weather} />
  
        </div>
      )

}
export default Weather