import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const TypeMenu = () => {
  const [ types, setTypes ] = useState([])
  // const [checked, setChecked] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  //   checkedF: true,
  //   checkedG: true,
  // });

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

  const handleChange = (event) => {
    // setState({ ...checked, [event.target.name]: event.target.checked });
  };


  return (
    <div>
      <Typography component='h3'>
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
            //  color="secondary"
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
