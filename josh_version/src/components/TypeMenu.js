import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { fetchURL, URL_BASE } from "../helpers/constants";

import { typeColors } from "../styles/typeColors";

const useStyles = makeStyles((theme) => ({
	heading: {
		fontWeight: "bold",
	},
}));

const TypeMenu = ({ filterTypes, setFilterTypes }) => {
	const [types, setTypes] = useState([]);

	const classes = useStyles();

	useEffect(() => {
		fetchURL(`${URL_BASE}/type`).then((json) => setTypes(json.results));
	}, []);

	const handleChange = (e) => {
		let name = e.target.name;
		// JOSH - no need for this check - the disabled prop will ensure this doesn't fire on click
		// if (checked.length === 2 && !checked.includes(name)) return;
		setFilterTypes((prev) =>
			prev.includes(name)
				? prev.filter((type) => type !== name)
				: [...prev, name]
		);
	};

	// JOSH - you had updateFilterTypes here (which essentially just ran setFilterTypes)
	// You shouldn't update state within the 'render' section of a component so I'm going to delete it
	// this is also why you were seeing the error that you pasted at the bottom

	return (
		<div>
			<Typography className={classes.heading} component="h3">
				Filters
			</Typography>
			<FormGroup>
				{types.map((type, idx) => {
					let disabled =
						filterTypes.length === 2 && !filterTypes.includes(type.name);
					return (
						<FormControlLabel
							key={idx}
							control={
								<Checkbox
									checked={filterTypes.includes(type.name)}
									disabled={disabled}
									name={type.name}
									style={{
										color: disabled
											? "rgba(0, 0, 0, 0.38)"
											: `${typeColors[type.name]}`,
									}}
									onChange={handleChange}
								/>
							}
							label={type.name}
						/>
					);
				})}
			</FormGroup>
		</div>
	);
};

export default TypeMenu;

// OCCASIONALLY GETTING THIS WARNING, NOT SURE WHY...
// WDS...
// index.js:1 Warning: Cannot update a component (`App`) while rendering a different component (`TypeMenu`). To locate the bad setState() call inside `TypeMenu`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
//     at TypeMenu (http://localhost:3000/poke_challenge/static/js/main.chunk.js:1014:3)
//     at div
//     at Grid (http://localhost:3000/poke_challenge/static/js/vendors~main.chunk.js:4277:35)
//     at WithStyles(ForwardRef(Grid)) (http://localhost:3000/poke_challenge/static/js/vendors~main.chunk.js:11141:31)
//     at div
//     at Grid (http://localhost:3000/poke_challenge/static/js/vendors~main.chunk.js:4277:35)
//     at WithStyles(ForwardRef(Grid)) (http://localhost:3000/poke_challenge/static/js/vendors~main.chunk.js:11141:31)
//     at PokeDex (http://localhost:3000/poke_challenge/static/js/main.chunk.js:830:3)
//     at App (http://localhost:3000/poke_challenge/static/js/main.chunk.js:34:89)
