import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './components/Navbar'
import PokeDex from './components/PokeDex'

function App() {
	const [ pokemons, setPokemons ] = useState([])
	const [ searchTerm, setSearchTerm ] = useState('')

	const URL_BASE = 'https://pokeapi.co/api/v2'

	// NOTE...Diglett (#50) is not availale by it's name in the API, though it is by it's id.  API must be broken but I need to access by name for the filtering to work.  I'm mapping the initial fetch to an array of objects with {id, name} so I have both available, but in the PokeCard component I'm making the fetch based on name. I also need the name for the search function.

	// WORKING BASIC FETCH FOR ALL POKEMONS WITHOUT TYPE FILTERING
	// fetch all pokemons {names, url}.  the names will be used in the PokeCard to make another request for each card for the specific pokemon data
	useEffect(
		() => {
			// const API_URL = `${URL_BASE}/pokemon`
			const API_URL = `${URL_BASE}/pokedex/2`
			const loadData = async () => {
				try {
					const res = await fetch(API_URL)
					if (!res.ok) throw new Error('could not fetch pokemons')
					const json = await res.json()
					// setPokemons(json.results)
					// console.log(json.pokemon_entries.map(entry => {
					//   return {id: entry.entry_number, name: entry.pokemon_species.name}
					// }))
					const nameArray = json.pokemon_entries.map((entry) => {
						return { id: entry.entry_number, name: entry.pokemon_species.name }
					})
					setPokemons(nameArray)
				} catch (err) {
					console.log(err)
				}
			}
			loadData()
		},
		[  ]
	)

	const search = () => {
		return pokemons.filter((pokemon) => {
			return pokemon.name.indexOf(searchTerm) > -1
		})
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{/* <PokeDex pokemons={pokemons} /> */}
			<PokeDex pokemons={search(pokemons)} />
		</React.Fragment>
	)
}

export default App
