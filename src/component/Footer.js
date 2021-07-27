import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { FaHeartBroken } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
	text: {
		fontSize: '16px',
	},
	icon: {
		color: '#EB5757',
	},
}));

function Footer() {
	const classes = useStyles();
	return (
		<div>
			<Grid container alignItems='center' justifyContent='center'>
				<Grid item xs={12} sm={12} md={12} lg={12} align='center'>
					<Typography variant='body2' className={classes.text} component='h2'>
						Made with <FaHeartBroken size={18} className={classes.icon} /> by
						Favour Vivian Woka
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

export default Footer;
