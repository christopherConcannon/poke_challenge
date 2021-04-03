import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './components/Navbar'
import PokeDex from './components/PokeDex'

function App() {
	const [ pokemons, setPokemons ] = useState([])
	const [ searchTerm, setSearchTerm ] = useState('')
	const [ filterTypes, setFilterTypes ] = useState([])
	// const [ filteredPokemons, setFilteredPokemons ] = useState([])

	const URL_BASE = 'https://pokeapi.co/api/v2'

	// fetch all pokemons {names, url}.  the names will be used in the PokeCard to make another request for each card for the specific pokemon data
	// useEffect(() => {
	// 	const API_URL = `${URL_BASE}/pokemon`
	// 	const loadData = async () => {
	// 		try {
	// 			const res = await fetch(API_URL)
	// 			if (!res.ok) throw new Error('could not fetch pokemons')
	// 			const json = await res.json()
	// 			setPokemons(json.results)
	// 		} catch (err) {
	// 			console.log(err)
	// 		}
	// 	}
	// 	loadData()
	// }, [])

	useEffect(
		() => {
			let API_URL = ''
			const loadData = async () => {
				if (filterTypes[0] === undefined) {
					try {
						API_URL = `${URL_BASE}/pokemon`
						const res = await fetch(API_URL)
						if (!res.ok) throw new Error('could not fetch pokemons')
						const json = await res.json()
						setPokemons(json.results)
					} catch (err) {
						console.log(err)
					}
				} else {
					filterTypes.forEach(async (type) => {
						try {
							API_URL = `${URL_BASE}/type/${type}`
							const res = await fetch(API_URL)
							if (!res.ok) throw new Error('could not fetch pokemons')
							const json = await res.json()
							const filtered = json.pokemon.map((pokemon) => {
								return { name: pokemon.pokemon.name, url: pokemon.pokemon.url }
							})

							setPokemons(filtered)
						} catch (err) {
							console.log(err)
						}
					})
				}
			}

			loadData()
		},
		[ filterTypes ]
	)

	// useEffect(
	// 	() => {
	// 		const API_URL = `${URL_BASE}/type/${filterTypes[0]}`
	// 		const loadData = async () => {
	// 			if (filterTypes !== null) {
	// 				try {
	// 					const res = await fetch(API_URL)
	// 					if (!res.ok) throw new Error('could not fetch types')
	// 					const json = await res.json()
	//           const filteredPokemons = json
	// 					// const filteredPokemons = json.pokemon.pokemon.map((pokemon) => {
	// 					// 	return pokemon.name
	// 					// })
	//           console.log(filteredPokemons)
	// 					// setPokemons(filteredPokemons)
	// 				} catch (err) {
	// 					console.log(err)
	// 				}
	// 			}
	// 		}
	// 		loadData()
	// 	},
	// 	[ filterTypes ]
	// )

	const search = () => {
		return pokemons.filter((pokemon) => {
			return pokemon.name.indexOf(searchTerm) > -1
		})
	}

	const updateFilterTypes = (name) => {
		setFilterTypes((prev) => {
			return prev.includes(name)
				? prev.filter((type) => type !== name)
				: [ ...prev, name ]
		})
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<PokeDex pokemons={search(pokemons)} updateFilterTypes={updateFilterTypes} />
			{/* <PokeDex pokemons={pokemons} updateFilterTypes={updateFilterTypes} /> */}
		</React.Fragment>
	)
}

export default App
