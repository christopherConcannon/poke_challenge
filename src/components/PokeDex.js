import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TypeMenu from './TypeMenu'
import PokeCard from './PokeCard'

const PokeDex = () => {
	const [ data, setData ] = useState([])

	const URL_BASE = 'https://pokeapi.co/api/v2'

	useEffect(() => {
		const API_URL = `${URL_BASE}/pokemon`
		const loadData = async () => {
			try {
				const res = await fetch(API_URL)
				if (!res.ok) throw new Error('could not fetch pokemons')
				const json = await res.json()
				setData(json.results)
			} catch (err) {
				console.log(err)
			}
		}
		loadData()
	}, [])

	return (
		<Grid container spacing={2}>
			<Grid item xs={4} sm={2}>
				<TypeMenu />
			</Grid>
			<Grid item xs={8} sm={10}>
				<Grid container spacing={2}>
					{data.length > 0 &&
						data.map((item, idx) => <PokeCard key={idx} name={item.name} />)}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default PokeDex
