import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import DragAndDrop from '../component/DragAndDrop';
import Button from '@material-ui/core/Button';
import { storage } from '../firebase';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		height: '100vh',
		margin: '0',
		padding: '0',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '68vh',
	},
	typo: {
		fontSize: '20px',
		color: ' #4F4F4F',
		fontFamily: 'Poppins, sans-serif',
		fontStyle: 'normal',
		fontWeight: '800',
		lineHeight: '27px',
		marginTop: '6%',
	},
	typoType: {
		letterSpacing: '-0.035em',
		textAlign: 'center',
		color: ' #4F4F4F',
		fontSize: '12px',
		marginTop: '4%',
	},
	input: {
		display: 'none',
	},
	button: {
		textAlign: 'center',
		width: '40%',
		background: '#2F80ED',
		color: '#fff',
		textTransform: 'capitalize',
		'&:hover': {
			background: '#2F80ED',
		},
	},
}));

function Dahboard() {
	const classes = useStyles();
	const [state, setState] = useState('');
	// const [imageAsUrl, setImageAsUrl] = useState();
	// const keys = [];
	let hold = '';
	const handleDrop = (files) => {
		console.log(files);
		for (let i = 0; i < files.length; i++) {
			const value = files[i].name;
			let fileType = files[i].type.split('/')[0];
			if (fileType === 'image') {
				hold = value;
			} else {
				console.log('rfjrfjhjkr');
			}
			console.log(fileType);
		}
		const uploadTask = storage.ref(`/images/${hold}`).put(files.type);
		uploadTask.on(
			'state_changed',
			(snapShot) => {
				console.log(snapShot);
			},
			(err) => {
				console.log(err);
			},
			// eslint-disable-next-line no-loop-func
			() => {
				storage
					.ref('images')
					.child(hold)
					.getDownloadURL()
					.then((fireBaseUrl) => {
						console.log(fireBaseUrl);
						// setImageAsUrl((prevObject) => ({
						// 	...prevObject,
						// 	imgUrl: fireBaseUrl,
						// }));
					});
			}
		);
	};

	const handleChange = (e) => {
		console.log(e.target.value);
		// setstate(e.target.value);
	};

	return (
		<div>
			<Grid
				className={classes.root}
				container
				alignItems='center'
				justifyContent='center'
			>
				<Grid item xs={12} sm={6} md={6} lg={4}>
					<Paper className={classes.paper}>
						{/* <img src={imageAsUrl} alt='tag' /> */}
						<Typography variant='h1' className={classes.typo} component='h2'>
							Upload your image
						</Typography>
						<Typography
							variant='body2'
							className={classes.typoType}
							component='p'
						>
							File should be jpeg, Png, ....
						</Typography>
						<CardContent>
							<DragAndDrop handleDrop={(files) => handleDrop(files)}>
								<div style={{ height: 300, width: 250 }}></div>
							</DragAndDrop>
						</CardContent>
						<Typography variant='body2' component='p'>
							Or
						</Typography>
						<input
							accept='image/*'
							className={classes.input}
							id='contained-button-file'
							multiple
							type='file'
							value={state}
							onChange={handleChange}
						/>
						<label htmlFor='contained-button-file'>
							<Button
								variant='contained'
								className={classes.button}
								component='span'
							>
								Choose a file
							</Button>
						</label>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Dahboard;
