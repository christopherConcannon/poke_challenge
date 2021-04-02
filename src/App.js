import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './components/Navbar'
import PokeDex from './components/PokeDex'

function App() {
  const [ searchTerm, setSearchTerm ] = useState('')
	const [ pokemons, setPokemons ] = useState([])

	const URL_BASE = 'https://pokeapi.co/api/v2'

	useEffect(() => {
		const API_URL = `${URL_BASE}/pokemon`
		const loadData = async () => {
			try {
				const res = await fetch(API_URL)
				if (!res.ok) throw new Error('could not fetch pokemons')
				const json = await res.json()
				setPokemons(json.results)
			} catch (err) {
				console.log(err)
			}
		}
		loadData()
	}, [])

  const search = () => {
    return pokemons.filter(pokemon => {
      return pokemon.name.indexOf(searchTerm) > -1
    })
  }

	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<PokeDex pokemons={search(pokemons)} setPokemons={setPokemons} />
		</React.Fragment>
	)
}

export default App
