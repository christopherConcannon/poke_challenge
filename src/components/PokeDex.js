import React from 'react'

import Grid from '@material-ui/core/Grid'
import TypeMenu from './TypeMenu'
import PokeCard from './PokeCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 3)
  }
}))

const PokeDex = ({ pokemons, updateFilterTypes }) => {

	const classes = useStyles()

	return (
			<Grid className={classes.root} container spacing={2}>
				<Grid item xs={4} sm={2}>
					<TypeMenu updateFilterTypes={updateFilterTypes} />
				</Grid>
				<Grid item xs={8} sm={10}>
					<Grid container spacing={2}>
						{pokemons.length > 0 &&
							pokemons.map((pokemon, idx) => <PokeCard key={idx} data={pokemon} />)}
					</Grid>
				</Grid>
			</Grid>
	)
}

export default PokeDex
