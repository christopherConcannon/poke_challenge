import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles'

import { getTypeColor } from '../utils/helpers'

const useStyles = makeStyles(theme => ({
  heading: {
    fontWeight: 'bold'
  }
}))



const TypeMenu = ({ updateFilterType }) => {
  const [ types, setTypes ] = useState([])
  // const [checked, setChecked] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  //   checkedF: true,
  //   checkedG: true,
  // });

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
    // setState({ ...checked, [event.target.name]: event.target.checked });
    const type = e.target.name.slice(0, -7)
    updateFilterType(type)
    console.log('filter clicked')
  }


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
            //  checked={checked.checkedB}
             onChange={handleChange}
             name={`${type.name}Checked`}
            // color='primary'
            style={{color: `${getTypeColor(type.name)}`}}
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
