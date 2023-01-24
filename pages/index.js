import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {


  const [data, setData] = useState({});
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [temp, setTemp] = useState(0)
  const [feels_like, setfeelsLike] = useState(0)
  const [windSpeed, setwindSpeed] = useState(0)


  var apiKey = "e0399234f58bd1a41bc34a7d1165bc9d";
  var lang = "en";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url)
        .then((response) => {
          console.clear();
          console.log(response)
          console.log(weather)
          console.log(data)
          setTemp(response.data.main.temp)
          setfeelsLike(response.data.main.feels_like)
          setwindSpeed(response.data.wind.speed)
          setData(response.data)
          setWeather(response.data.weather)
          setErrorMessage("")
        }).catch(err => {
          console.log(err)
          setErrorMessage("Please enter another city")
          setData()
          setWeather('')
        })
      setLocation('');
    }
  }

  return (
    <>
      <Head>
        <title>Weather Web App</title>
        <meta name="description" content="Weather Web App" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=fira+sans"></link>
      </Head>

      <header className={styles.layoutheader}>

        <h1>Weather Web App</h1>
        <h2>
          Enter a City Location to know the Current Weather.</h2>
      </header>

      <main className={styles.main}>
        {errorMessage}
        <div className={styles.header}>
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder="Enter City Location"
            onKeyDown={searchLocation}
            type="text"
          />

          {data ? <p className={styles.name}>{data.name}</p> : <></>}

          {weather && weather.map((w, index) => {
            return (
              <div key={index} >
                <p className={styles.desc}>{w.description}</p>
              </div>
            )

          })}
        </div>
        <div className={styles.stats}>
          <div>
            <h2>Temperature</h2>
            {data ? <p><span className={styles.stat}>{temp}</span>℃</p> : <></>}
          </div>
          <div>
            <h2>Feels Like</h2>
            {data ? <p><span className={styles.stat}>{feels_like}</span>℃</p> : <></>}
          </div>
          <div>
            <h2>Wind Gust</h2>
            {data ? <p><span className={styles.stat}>{windSpeed}</span>m/s</p> : <></>}
          </div>


        </div>
      </main>
    </>
  )
}
