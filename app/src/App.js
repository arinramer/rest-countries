import {React, useEffect, useState} from 'react';
import axios from 'axios';
import Home from './Home.js';
import Card from './Card.js';
import {Route} from "react-router-dom";

function App() {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      setCountries(res.data)
    })
  }, []);
  return(
    <>
      <Route 
        exact 
        path="/" 
        render={(props) => (
          <Home {...props} countries={countries}/>
        )} />
      <Route
        path="/country/:id" 
        render={(props) => (
          <Card {...props} countries={countries}/>
        )} />
    </>
  )
}

export default App;
