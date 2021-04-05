import React from 'react'

import Grid from '@material-ui/core/Grid'

import PokeCard from './PokeCard'

const PokeList = ({ getPages }) => {
	return (
			<Grid container spacing={2}>
				{getPages().map((pokemon, idx) => <PokeCard key={idx} data={pokemon} />)}
			</Grid>
	)
}

export default PokeList
