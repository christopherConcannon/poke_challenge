import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { getTypeColor } from '../utils/helpers'

const useStyles = makeStyles((theme) => ({
	root           : {
		maxWidth : 345
	},
	id             : {
		color : '#B3B3B3'
	},
	mediaContainer : {
		margin       : theme.spacing(1, 'auto', 3),
		height       : 150,
		width        : 150,
		background   : '#F0F0F0',
		borderRadius : '50%'
	},
	name           : {
		fontSize      : 18,
		textTransform : 'capitalize',
		fontWeight    : 'bold'
	},
	buttonGroup    : {
		width   : '100%',
		padding : '.1rem'
	},
	button         : {
		width         : '100%',
		padding       : '.15rem',
		pointerEvents : 'none',
		border        : 'none',
		textTransform : 'capitalize'
	}
}))

const PokeCard = ({ data }) => {
	const [ pokemon, setPokemon ] = useState({})
	const classes = useStyles()
	const URL_BASE = 'https://pokeapi.co/api/v2'

	const id = pokemon.id ? pokemon.id.toString().padStart(3, '0') : ''

	useEffect(
		() => {
			const API_URL = `${URL_BASE}/pokemon/${data.id}`
			// const API_URL = `${URL_BASE}/pokemon/${data.name}`
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

			// WITHOUT CLEANUP FUNCTION I GET THIS WARNING WHEN I PERFORM A SEARCH
			// Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
			// at PokeCard

			// cleanup to address warning seen above
			return () => setPokemon({})
		},
		[ data ]
	)

	return (
		<React.Fragment>
			{pokemon && (
				<Grid item xs={4} sm={3}>
					<Card className={classes.root}>
						<CardContent>
							<Typography className={classes.id} component='h3'>{`#${id}`}</Typography>
							<div className={classes.mediaContainer}>
								<CardMedia
									component='img'
									alt={pokemon.name}
									// image={pokemon.sprites?.front_default}
									image={pokemon.sprites && pokemon.sprites.front_default}
									title={pokemon.name}
								/>
							</div>

							<Typography
								className={classes.name}
								align='center'
								gutterBottom
								component='h2'
							>
								{pokemon.name}
							</Typography>
							<ButtonGroup className={classes.buttonGroup} aria-label='button group'>
								{/* {pokemon.types?.map((type, idx) => ( */}
								{pokemon.types &&
									pokemon.types.map((type, idx) => {
										return (
											<Button
												className={classes.button}
												key={idx}
												disableElevation
												style={{ backgroundColor: `${getTypeColor(type.type.name)}` }}
											>
												{type.type.name}
											</Button>
										)
									})}
							</ButtonGroup>
						</CardContent>
					</Card>
				</Grid>
			)}
		</React.Fragment>

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
