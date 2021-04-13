import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import TypeMenu from "./TypeMenu";
import PokeCard from "./PokeCard";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4, 3),
	},
}));

const PokeDex = ({ pokemons, filterTypes, setFilterTypes }) => {
	const classes = useStyles();

	// JOSH - The grid stuff you did here is pretty dope!
	return (
		<Grid className={classes.root} container spacing={2}>
			<Grid item xs={4} sm={2}>
				<TypeMenu filterTypes={filterTypes} setFilterTypes={setFilterTypes} />
			</Grid>
			<Grid item xs={8} sm={10}>
				<Grid container spacing={2}>
					{pokemons.length > 0 &&
						pokemons.map((pokemon, idx) => (
							<PokeCard key={idx} pokemon={pokemon} />
						))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PokeDex;
