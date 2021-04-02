// import React, { useState, useEffect } from 'react'
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './components/Navbar'
import PokeDex from './components/PokeDex'

function App() {
	// const [ data, setData ] = useState([])

	// const URL_BASE = 'https://pokeapi.co/api/v2'

	// useEffect(() => {
	// 	const API_URL = `${URL_BASE}/pokemon`
	// 	const loadData = async () => {
	// 		try {
	// 			const res = await fetch(API_URL)
	// 			if (!res.ok) throw new Error('could not fetch pokemons')
	// 			const json = await res.json()
	// 			setData(json.results)
	// 		} catch (err) {
	// 			console.log(err)
	// 		}
	// 	}
	// 	loadData()
	// }, [])

	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar />
			<PokeDex />
		</React.Fragment>
	)
}

export default App
