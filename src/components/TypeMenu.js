import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

import { getTypeColor } from '../utils/helpers'

const useStyles = makeStyles((theme) => ({
	heading : {
		fontWeight : 'bold'
	}
}))

const TypeMenu = ({ updateFilterTypes }) => {
	const [ types, setTypes ] = useState([])
	const [ checked, setChecked ] = React.useState([])

	const classes = useStyles()

	const URL_BASE = 'https://pokeapi.co/api/v2'

	useEffect(() => {
		const API_URL = `${URL_BASE}/type`
		const loadData = async () => {
			try {
				const res = await fetch(API_URL)
				if (!res.ok) throw new Error('could not fetch pokemons')
				const json = await res.json()
				setTypes(json.results)
			} catch (err) {
				console.log(err)
			}
		}
		loadData()
	}, [])

	const handleChange = (e) => {
		if (checked.length === 2 && !checked.includes(e.target.name)) return
		setChecked((prev) => {
			return prev.includes(e.target.name)
				? prev.filter((type) => type !== e.target.name)
				: [ ...prev, e.target.name ]
		})
	}

	updateFilterTypes(checked)

	return (
		<div>
			<Typography className={classes.heading} component='h3'>
				Filters
			</Typography>
			<FormGroup>
				{types.map((type, idx) => (
					<FormControlLabel
						key={idx}
						control={
							<Checkbox
								checked={checked.includes(type.name)}
								disabled={checked.length === 2 && !checked.includes(type.name)}
								name={type.name}
								style={{
									color :
										checked.length === 2 && !checked.includes(type.name)
											? 'rgba(0, 0, 0, 0.38)'
											: `${getTypeColor(type.name)}`
								}}
								onChange={handleChange}
							/>
						}
						label={type.name}
					/>
				))}
			</FormGroup>
		</div>
	)
}

export default TypeMenu


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