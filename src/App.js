import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './components/Navbar'
import PokeDex from './components/PokeDex'

function App() {
	const [ pokemons, setPokemons ] = useState([])
	const [ searchTerm, setSearchTerm ] = useState('')

	const URL_BASE = 'https://pokeapi.co/api/v2'


	// WORKING BASIC FETCH FOR ALL POKEMONS WITHOUT TYPE FILTERING
	// fetch all pokemons {names, url}.  the names will be used in the PokeCard to make another request for each card for the specific pokemon data
	// useEffect(
	// 	() => {
	// 		// const API_URL = `${URL_BASE}/pokemon`
	// 		const API_URL = `${URL_BASE}/pokedex/2`
	// 		const loadData = async () => {
	// 			try {
	// 				const res = await fetch(API_URL)
	// 				if (!res.ok) throw new Error('could not fetch pokemons')
	// 				const json = await res.json()
	// 				// setPokemons(json.results)
	// 				// console.log(json.pokemon_entries.map(entry => {
	// 				//   return {id: entry.entry_number, name: entry.pokemon_species.name}
	// 				// }))
	// 				const pokeObjArr = json.pokemon_entries.map((entry) => {
	// 					return { id: entry.entry_number, name: entry.pokemon_species.name }
	// 				})
	// 				setPokemons(pokeObjArr)
	// 			} catch (err) {
	// 				console.log(err)
	// 			}
	// 		}
	// 		loadData()
	// 	},
	// 	[]
	// )

  // REFACTORED TO FETCH INDIVIDUAL POKES FROM APP COMPONENT
	useEffect(
		() => {
			// const API_URL = `${URL_BASE}/pokemon`
			const DEX_URL = `${URL_BASE}/pokedex/2`
			const loadData = async () => {
				try {
					const dexRes = await fetch(DEX_URL)
					if (!dexRes.ok) throw new Error('could not fetch pokedex')
					const dexJSON= await dexRes.json()
					// setPokemons(json.results)
					// console.log(json.pokemon_entries.map(entry => {
					//   return {id: entry.entry_number, name: entry.pokemon_species.name}
					// }))
					const pokeObjArr = dexJSON.pokemon_entries.map((entry) => {
						return { id: entry.entry_number, name: entry.pokemon_species.name }
					})

          // const pokeArr = pokeObjArr.map(async poke => {
          pokeObjArr.forEach(async poke => {
            const POKE_URL = `${URL_BASE}/pokemon/${poke.id}`
            const pokeRes = await fetch(POKE_URL)
            // if (!pokeRes.ok) throw new Error('could not fetch pokemons')
            const pokeJSON = await pokeRes.json()
            // console.log(pokeJSON)
            const pokeObj = {
              id: pokeJSON.id,
              name: pokeJSON.name,
              img: pokeJSON.sprites.front_default,
              types: pokeJSON.types.map(type => type.type.name)
            }
            // results show up in jumbled order sometimes, I think because certain results go slower.  so I sort the results by id before updating state
            await setPokemons(prev => [...prev, pokeObj].sort((a, b) => {
              if (a.id < b.id) return -1
              if (a.id > b.id) return 1
              return 0
            }))
          })
				} catch (err) {
					console.log(err)
				}
			}
			loadData()
		},
		[]
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
