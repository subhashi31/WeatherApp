// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=505e71496378395dae9d5619e2e91415
import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from './weathercard';

export const Temp = () => {

  const [searchValue, setSearchValue] = useState("Gwalior");
  
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async() => {
      try{
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=putyourapikeyhere`;

          const res = await fetch(url);
          const data = await res.json();
          
        //   destructing the fetched data
           const { temp, humidity, pressure } =data.main;
           const { main:weathermood} = data.weather[0];
           const { name } = data;
           const { speed } = data.wind;
           const { country, sunset } = data.sys;

           const myNewWeatherInfo = {
               temp,
               humidity,
               pressure,
               weathermood,
               name,
               speed,
               country,
               sunset,
           };

           setTempInfo(myNewWeatherInfo);    

      } catch(error){

      }

  }

  useEffect(()=>{getWeatherInfo()}, []);

  return (
    <>
    <div className='wrap'>
       <div className='search'>
           <input type="search" placeholder='search...' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>

            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>

        </div>    
    </div>

    {/* temperature show card*/}

    <Weathercard tempInfo={tempInfo}/>

    </>
  )
}
