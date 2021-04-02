import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
	root  : {
		maxWidth : 345
	},
	media : {
		height : 140
	}
})

// pokemon.id
// pokemon.sprites.front_default
// pokemon.name
// pokemon.types
// pokemon.types[0].type.name

const PokeCard = ({ name }) => {
	const [ pokemon, setPokemon ] = useState({})
	const classes = useStyles()
	const URL_BASE = 'https://pokeapi.co/api/v2'

	useEffect(() => {
		const API_URL = `${URL_BASE}/pokemon/${name}`
		const loadData = async () => {
			try {
				const res = await fetch(API_URL)
				if (!res.ok) throw new Error('could not get poke data')
				const json = await res.json()
				setPokemon(json)
			} catch (err) {
				console.log(err)
			}
		}
		loadData()
	}, [])

	return (
		<Grid item xs={4} sm={3}>
			<Card className={classes.root}>
				<CardContent>
					<Typography component='h3'>{pokemon.id}</Typography>
					<CardMedia
						component='img'
						alt='Contemplative Reptile'
						height='140'
						// image={pokemon.sprites.front_default}
						image={pokemon.sprites?.front_default}
						title='Contemplative Reptile'
					/>
					<Typography gutterBottom variant='h5' component='h2'>
						{pokemon.name}
					</Typography>
					<ButtonGroup aria-label='button group'>
						{pokemon.types?.map((type, idx) => (
							<Button key={idx} disableElevation disabled>
								{type.type.name}
							</Button>
						))}
					</ButtonGroup>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default PokeCard
