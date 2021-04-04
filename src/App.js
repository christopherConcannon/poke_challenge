import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './components/Navbar'
import PokeDex from './components/PokeDex'

function App() {
	const [ pokemons, setPokemons ] = useState([])
	const [ searchTerm, setSearchTerm ] = useState('')
	const [ filterTypes, setFilterTypes ] = useState([])

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
					const pokeObjArr = json.pokemon_entries.map((entry) => {
						return { id: entry.entry_number, name: entry.pokemon_species.name }
					})
					setPokemons(pokeObjArr)
				} catch (err) {
					console.log(err)
				}
			}
			loadData()
		},
		[]
	)
	useEffect(
		() => {
			if (filterTypes.length === 0) return  
        // loop over each filter type and fetch data
        // let filterablePokemons = [...pokemons]
        let filteredPokemons = []
				filterTypes.forEach((type) => {
					const API_URL = `${URL_BASE}/type/${type}`
					const loadData = async () => {
						try {
							const res = await fetch(API_URL)
							if (!res.ok) throw new Error('could not fetch types')
							const json = await res.json()
							// console.log('filtered by type: ', json.pokemon[0].pokemon.name);
              // the type endpoint returns all pokemons that match the type, not just the ones from the pokedex, so we need to filter the ones that match the type and are from the pokedex
							const pokeDexMembers = json.pokemon.filter((pokeDexMember) => {
								const nameArray = pokemons.map((pokemon) => pokemon.name)
								return nameArray.includes(pokeDexMember.pokemon.name)
							})
							// console.log("pokeDexMembers of type: ", pokeDexMembers)
              // next we want to map the results to an array of objects that match our data structure for pokemons
							const filteredGroup = pokeDexMembers.map((pdm) => {
								const id = pdm.pokemon.url.slice(34, -1)
								const name = pdm.pokemon.name
								return { id, name }
							})
							// console.log("filteredGroup: ", filteredGroup);
              filteredPokemons.push(...filteredGroup)

              console.log('filteredPokemons: ', filteredPokemons)
              // setPokemons(filteredPokemons)
						} catch (err) {
							console.log(err)
						}
					}
					loadData()
				})
        
        console.log('filteredPokemons: ', filteredPokemons)
				// setPokemons(filteredPokemons)
			
		},
		[ filterTypes ]
    )

	const search = () => {
		return pokemons.filter((pokemon) => {
			return pokemon.name.indexOf(searchTerm) > -1
		})
	}

  const updateFilterTypes = (types) => {
		setFilterTypes(types)
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{/* <PokeDex pokemons={pokemons} /> */}
			<PokeDex pokemons={search(pokemons)} updateFilterTypes={updateFilterTypes} />
		</React.Fragment>
	)
}

export default App
