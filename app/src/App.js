import {React, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  text-align: center;
`
const Box = styled.div`
  border: 1px solid black;
  margin: 20px;
  flex-basis: 21%;
`

function App() {
  const [countries, setCountries] = useState();
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      setCountries(res.data)
    })
  }, []);
  return (
    <div>
      <h1 style={{marginLeft: '3.5%'}}>Where in the world?</h1>
      <Container>
      {console.log(countries)}
      {countries ? countries.map(item => {
        return(
          <Box key={item.name}>
            <img src={item.flag} style={{height: 'auto', width: '100%'}}/>
            <div>
              <h1>{item.name}</h1>
              <p>Population: {item.population}</p>
              <p>Region: {item.region}</p>
            </div>
          </Box>
        )
      }): <div>Loading</div>}
      </Container>
    </div>
  );
}

export default App;
