import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root       : {
		flexGrow   : 1,
		background : '#BF625F'
	},
	title      : {
		flexGrow                     : 1,
		display                      : 'none',
		[theme.breakpoints.up('sm')]: {
			display : 'block'
		}
	},
	search     : {
		position                     : 'relative',
		borderRadius                 : theme.shape.borderRadius,
		backgroundColor              : fade(theme.palette.common.white, 0.15),
		'&:hover'                    : {
			backgroundColor : fade(theme.palette.common.white, 0.25)
		},
		marginLeft                   : 0,
		width                        : '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft : theme.spacing(1),
			width      : 'auto'
		}
	},
	searchIcon : {
		padding        : theme.spacing(0, 2),
		height         : '100%',
		position       : 'absolute',
		pointerEvents  : 'none',
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center'
	},
	inputRoot  : {
		color : 'inherit'
	},
	inputInput : {
		padding                      : theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft                  : `calc(1em + ${theme.spacing(4)}px)`,
		transition                   : theme.transitions.create('width'),
		width                        : '100%',
		[theme.breakpoints.up('sm')]: {
			width     : '12ch',
			'&:focus' : {
				width : '20ch'
			}
		}
	}
}))

const Navbar = ({ searchTerm, setSearchTerm }) => {
	const classes = useStyles()

	return (
		<div>
			<AppBar className={classes.root} position='static' elevation={0}>
				<Toolbar>
					<Typography className={classes.title} variant='h6' noWrap>
						Pokedex
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder='Search???'
							classes={{
								root  : classes.inputRoot,
								input : classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar
