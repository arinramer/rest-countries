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

const Dropdown = styled.div`
  height: 25px;
  border: .5px solid gray;
  border-radius: 5px;
  padding: 10px;
  user-select: none;
  &:hover {
    background-color: lightgray;
  }
`
const Dropdownbox = styled.div`
  text-align: center;
  border: .5px solid gray;
  border-bottom: 0px;
  padding: 8px;
  background-color: white;
  user-select: none;
  &:hover {
    background-color: lightgray;
  }
`

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState()
  const [input, setInput] = useState()
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      setCountries(res.data)
    })
  }, []);

  const handleInput = e => {
    e.preventDefault()
    setInput(e.target.value)
    setSearch(filteredCountries)
  }

  const menuToggle = e => {
    e.preventDefault()
    setMenu(!menu)
  }

  const menuButton = e => {
    e.preventDefault()
    const region = e.target.innerText
    const filteredRegion = 
      countries.filter(country => {
        return country.region === region
      })
    setSearch(filteredRegion)
    menuToggle(e)
  }

  const filteredCountries = 
    countries.filter(country => {
      return country.name.toLowerCase().includes(input)
    })

  return (
    <div>
      <div style={{marginLeft: '3.5%'}}>
        <h1>Where in the world?</h1>
        <input placeholder="Search" type="text" value={input} onChange={handleInput}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '5%', position: 'relative', marginTop: '-40px', marginLeft: '25%'}}>
        <Dropdown onClick={menuToggle}>Region {menu ? '↑': '↓'}</Dropdown>
        <div style={menu ? {display: 'flex', flexDirection: 'column', position: 'absolute', marginTop: '50px'}: {display: 'none'}}>
          <Dropdownbox onClick={menuButton}>Asia</Dropdownbox>
          <Dropdownbox onClick={menuButton}>Europe</Dropdownbox>
          <Dropdownbox onClick={menuButton}>Africa</Dropdownbox>
          <Dropdownbox onClick={menuButton}>Oceania</Dropdownbox>
          <Dropdownbox onClick={menuButton}>Americas</Dropdownbox>
          <Dropdownbox onClick={menuButton} style={{border: '.5px solid gray'}}>Polar</Dropdownbox>
        </div>
      </div>
      <Container>
      {console.log(countries)}
      {search ? search.map(item => {
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
      }): countries.map(item => {
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
      })}
      </Container>
    </div>
  );
}

export default App;
