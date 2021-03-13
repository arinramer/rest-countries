import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  text-align: center;
`

const Box = styled.div`
  border: 1px solid black;
  margin: 20px;
  height: auto;
  width: 400px;
`

function Card(props) {
    const borders = {}
    props.countries.map(country => {
        return borders[country.alpha3Code] = country.name
    })
    const backButton = (e) => {
        e.preventDefault()
        props.history.push('/')
    }

    return(
        props.countries.map(item => {
            if(props.match.params.id === item.alpha3Code) {
                return(
                    <>
                    <button onClick={backButton} style={{marginTop: '3%', marginLeft: '15%', padding: '20px'}}>←</button>
                    <Container>
                        <Box key={item.alpha3Code}>
                            <img src={item.flag} alt="Country flag" style={{height: 'auto', width: '100%'}}/>
                            <div>
                                <h1>{item.name}</h1>
                                <h2>{item.nativeName}</h2>
                                <p>Population: {item.population}</p>
                                <p>Region: {item.region}</p>
                                <p>Subregion: {item.subregion}</p>
                                <p>Capital: {item.capital}</p>
                                <div><h3>Languages:</h3> {item.languages.map((language) => {
                                    return <p>{language.name + " | " + language.nativeName}</p>
                                })}</div>
                                <div><h3>Currencies:</h3> {item.currencies.map((currency) => {
                                    return <p>{currency.name}</p>
                                })}</div>
                                <div style={{marginBottom: "3%"}}><h3>Bordering nations:</h3> {item.borders.map((country) => {
                                    return <Link to={`/country/${country}`}><button style={{padding: "2%", margin: "1%"}}>{borders[country]}</button></Link>
                                })}</div>
                            </div>
                        </Box>
                    </Container>
                    </>
                )
            }
            else {
                return null
            }
        })
    )
}

export default Card;