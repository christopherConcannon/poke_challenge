import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
	root           : {
		maxWidth : 345
	},
	mediaContainer : {
    margin: theme.spacing(1, 'auto', 3),
		height       : 150,
		width        : 150,
		background   : '#F0F0F0',
		borderRadius : '50%',
    // marginBottom: theme.spacing(3)
	},
	buttonGroup    : {
		width   : '100%',
		padding : '.1rem',
	},
	button         : {
		width   : '100%',
		padding : '0',
    pointerEvents: 'none'
	}
}))

// pokemon.id
// pokemon.sprites.front_default
// pokemon.name
// pokemon.types
// pokemon.types[0].type.name

const PokeCard = ({ data }) => {
	const [ pokemon, setPokemon ] = useState({})
	const classes = useStyles()
	const URL_BASE = 'https://pokeapi.co/api/v2'

	useEffect(() => {
		const API_URL = `${URL_BASE}/pokemon/${data.name}`
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
					<div className={classes.mediaContainer}>
						<CardMedia
							component='img'
							alt='Contemplative Reptile'
							// image={pokemon.sprites.front_default}
							// image={pokemon.sprites?.front_default}
							image={pokemon.sprites && pokemon.sprites.front_default}
							title='Contemplative Reptile'
						/>
					</div>

					<Typography align='center' gutterBottom variant='h6' component='h2'>
						{pokemon.name}
					</Typography>
					<ButtonGroup className={classes.buttonGroup} aria-label='button group'>
						{/* {pokemon.types?.map((type, idx) => ( */}
						{pokemon.types &&
							pokemon.types.map((type, idx) => (
								<Button className={classes.button} key={idx} disableElevation>
                  {/* TODO...change to sentence case and dynamically apply bg-color */}
									{type.type.name}
								</Button>
							))}
					</ButtonGroup>
				</CardContent>
			</Card>
		</Grid>

		// QUESTION -- is there a method to access resources located at a url which is a JSON property.  So for example I could access the individual pokemon data like below so I wouldn't have to make network requests for each individual pokemon.  the JSON object returned by the API_URL/pokemon endpoint looks like { name: 'whatever', url: 'https://pokeapi.co/api/v2/pokemon/1/'}, but trying to access
		// <Grid item xs={4} sm={3}>
		// 	<Card className={classes.root}>
		// 		<CardContent>
		// 			<Typography component='h3'>{pokemon.url.id}</Typography>
		// 			<CardMedia
		// 				component='img'
		// 				alt={pokemon.name}
		// 				height='140'
		// 				// image={pokemon.url.sprites.front_default}
		// 				image={pokemon.url.sprites?.front_default}
		// 				title={pokemon.name}
		// 			/>
		// 			<Typography gutterBottom variant='h5' component='h2'>
		// 				{pokemon.name}
		// 			</Typography>
		// 			<ButtonGroup aria-label='button group'>
		// 				{pokemon.url.types?.map((type, idx) => (
		// 					<Button key={idx} disableElevation disabled>
		// 						{type.type.name}
		// 					</Button>
		// 				))}
		// 			</ButtonGroup>
		// 		</CardContent>
		// 	</Card>
		// </Grid>
	)
}

export default PokeCard
