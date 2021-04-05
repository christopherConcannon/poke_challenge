import React from 'react'

import Grid from '@material-ui/core/Grid'

import PokeCard from './PokeCard'

const PokeList = ({ pokemons }) => {
	return (
		<Grid container spacing={2}>
			{pokemons.length > 0 &&
				pokemons.map((pokemon, idx) => <PokeCard key={idx} data={pokemon} />)}
		</Grid>
	)
}

export default PokeList
