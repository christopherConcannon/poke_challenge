import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid'
import TypeMenu from './TypeMenu'
import PokeCard from './PokeCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 3)
  }
}))

const PokeDex = () => {
	const [ pokemons, setPokemons ] = useState([])
	const classes = useStyles()

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

	return (
		// <Container>
			<Grid className={classes.root} container spacing={2}>
				<Grid item xs={4} sm={2}>
					<TypeMenu />
				</Grid>
				<Grid item xs={8} sm={10}>
					<Grid container spacing={2}>
						{pokemons.length > 0 &&
							pokemons.map((pokemon, idx) => <PokeCard key={idx} data={pokemon} />)}
					</Grid>
				</Grid>
			</Grid>
		// </Container>
	)
}

export default PokeDex
