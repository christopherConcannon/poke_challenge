import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./components/Navbar";
import PokeDex from "./components/PokeDex";

import { fetchURL, URL_BASE } from "./helpers/constants";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterTypes, setFilterTypes] = useState([]);
	// const [filteredPokemons, setFilteredPokemons] = useState([]);

	// NOTE...Diglett (#50) is not availale by it's name in the API, though it is by it's id.  API must be broken but I need to access by name for the filtering to work.  I'm mapping the initial fetch to an array of objects with {id, name} so I have both available, but in the PokeCard component I'm making the fetch based on name. I also need the name for the search function.  ALSO...some are not available by id right now

	// fetch all pokemons.  the names will be used in the PokeCard to make another request for each card for the specific pokemon data
	useEffect(() => {
		fetchURL(`${URL_BASE}/pokedex/2`).then((json) => {
			// map an array of objects with the data we need
			let pokePromises = [];
			json.pokemon_entries.forEach((entry) => {
				pokePromises.push(
					fetchURL(`${URL_BASE}/pokemon/${entry.entry_number}`)
				);
			});
			// JOSH - This ensures that all of the pokemon are loaded before we trigger a rerender
			// when we setPokemons...we still have to get all the pokemon data with 151 calls but
			// calling those endpoints was inevitable so you might as well do them all at once
			Promise.all(pokePromises).then((pokeData) => {
				setPokemons(pokeData);
			});
		});
	}, []);

	// useEffect(() => {
	// 	// JOSH - Much better idea to search by id than name
	// 	// const API_URL = `${URL_BASE}/pokemon/${pokemon.name}`
	// 	fetchURL(`${URL_BASE}/pokemon/${pokemon.id}`).then((json) =>
	// 		setPokemon(json)
	// 	);

	// 	// WITHOUT CLEANUP FUNCTION I GET THIS WARNING WHEN I PERFORM A SEARCH
	// 	// Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
	// 	// at PokeCard

	// 	// cleanup to address warning seen above
	// }, []);

	// useEffect(
	// 	() => {
	// 		if (filterTypes.length === 0) return;
	// 		// loop over each filter type and fetch data
	// 		let filterablePokemons = [...filteredPokemons];
	// 		filterTypes.forEach((type) => {
	// 			const API_URL = `${URL_BASE}/type/${type}`;
	// 			const loadData = async () => {
	// 				try {
	// 					const res = await fetch(API_URL);
	// 					if (!res.ok) throw new Error("could not fetch types");
	// 					const json = await res.json();
	// 					// the type endpoint returns all pokemons that match the type, not just the ones from the pokedex, so we need to filter the ones that match the type and are from the pokedex
	// 					const pokeDexMembers = json.pokemon.filter((pokeDexMember) => {
	// 						const nameArray = pokemons.map((pokemon) => pokemon.name);
	// 						return nameArray.includes(pokeDexMember.pokemon.name);
	// 					});
	// 					// next we want to map the results to an array of objects that match our data structure for pokemons
	// 					const filteredGroup = pokeDexMembers.map((pdm) => {
	// 						// JOSH - this slice 34 sticks out to me as easily breakable
	// 						const id = +pdm.pokemon.url.slice(34, -1);
	// 						const name = pdm.pokemon.name;
	// 						return { id, name };
	// 					});

	// 					// if theres only one filter type
	// 					if (filterTypes.length === 1) {
	// 						filterablePokemons.push(...filteredGroup);
	// 						setFilteredPokemons([...filterablePokemons]);
	// 						// otherwise we have two filter types and only want to return results that match both filter types
	// 					} else {
	// 						setFilteredPokemons((prev) => {
	// 							// loop over new filteredGroup
	// 							return filteredGroup.filter((newPoke) => {
	// 								// return only if their name is present in the old filteredPokemons
	// 								// if (prev.some((oldPoke) => oldPoke.name === newPoke.name)) return true
	// 								return prev.some((oldPoke) => oldPoke.name === newPoke.name);
	// 							});
	// 						});
	// 					}
	// 				} catch (err) {
	// 					console.log(err);
	// 				}
	// 			};
	// 			loadData();
	// 		});
	// 	},

	// 	// GETTING THIS WARNING BUT IF I ADD THOSE TO DEP ARRAY I GET INFINITE LOOPING NETWORK REQUESTS
	// 	// src\App.js
	// 	// Line 87:3:  React Hook useEffect has missing dependencies: 'filteredPokemons' and 'pokemons'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
	// 	[filterTypes]
	// );

	// I would say its unnecessary to create a whole new state object just for the filtered pokemon
	// Setting filterTypes will trigger a rerender...you should already have the types of each pokemon
	// so at the point it's just a matter of selecting the pokemon that are included in the filter
	let filteredPokemons =
		filterTypes.length === 0
			? pokemons
			: pokemons.filter((pokemon) =>
					filterTypes.every((filterTypes) =>
						pokemon.types.find(
							(pokemonType) => filterTypes === pokemonType.type?.name
						)
					)
			  );

	let filteredAndSearchedPokemons = filteredPokemons.filter((pokemon) => {
		let pokemonName = pokemon.name.toUpperCase();
		const cleanSearchTerm = searchTerm.toUpperCase().trim();
		return pokemonName.indexOf(cleanSearchTerm) > -1;
	});

	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<PokeDex
				pokemons={filteredAndSearchedPokemons}
				filterTypes={filterTypes}
				setFilterTypes={setFilterTypes}
			/>
		</React.Fragment>
	);
}

export default App;
