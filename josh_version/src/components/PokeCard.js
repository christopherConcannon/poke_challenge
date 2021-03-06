import React from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { typeColors } from "../styles/typeColors";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	id: {
		color: "#B3B3B3",
	},
	mediaContainer: {
		margin: theme.spacing(1, "auto", 3),
		height: 150,
		width: 150,
		background: "#F0F0F0",
		borderRadius: "50%",
	},
	name: {
		fontSize: 18,
		textTransform: "capitalize",
		fontWeight: "bold",
	},
	buttonGroup: {
		width: "100%",
		padding: ".1rem",
	},
	button: {
		width: "100%",
		padding: ".15rem",
		pointerEvents: "none",
		border: "none",
		textTransform: "capitalize",
	},
}));

const PokeCard = ({ pokemon }) => {
	const classes = useStyles();

	// JOSH - by removing this useEffect and fetching the pokemon data at the top level
	// We can pass the pokemon into this component and it can be completely "dumb"
	// In general, it's good practice to use as few state objects as possible

	// JOSH - padStart!!  that's awesome, stealing that one lol
	const id = pokemon.id ? pokemon.id.toString().padStart(3, "0") : "";

	return (
		<React.Fragment>
			{pokemon && (
				<Grid item xs={12} sm={6} md={3}>
					<Card className={classes.root}>
						<CardContent>
							<Typography
								className={classes.id}
								component="h3"
							>{`#${id}`}</Typography>
							<div className={classes.mediaContainer}>
								<CardMedia
									component="img"
									alt={pokemon.name}
									image={pokemon.sprites?.front_default}
									title={pokemon.name}
								/>
							</div>

							<Typography
								className={classes.name}
								align="center"
								gutterBottom
								component="h2"
							>
								{pokemon.name}
							</Typography>
							<ButtonGroup
								className={classes.buttonGroup}
								aria-label="button group"
							>
								{pokemon.types?.map((type, idx) => {
									return (
										<Button
											className={classes.button}
											key={idx}
											disableElevation
											style={{
												backgroundColor: `${typeColors[type.type.name]}`,
											}}
										>
											{type.type.name}
										</Button>
									);
								})}
							</ButtonGroup>
						</CardContent>
					</Card>
				</Grid>
			)}
		</React.Fragment>

		// QUESTION -- is there a method to access resources located at a url which is a JSON property.
		// So for example I could access the individual pokemon data like below so I wouldn't have to make network requests for each individual pokemon.
		// the JSON object returned by the API_URL/pokemon endpoint looks like { name: 'whatever', url: 'https://pokeapi.co/api/v2/pokemon/1/'}

		// JOSH - Yes!  take a look at my code, I do something very similar to this!
		// Wrote this earlier lol turns out I just implemented it anyway

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
	);
};

export default PokeCard;
