import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import DragAndDrop from '../component/DragAndDrop';
import Button from '@material-ui/core/Button';
import { storage } from '../firebase';
import { VscCheck } from 'react-icons/vsc';
import '../App.css';

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
		minHeight: '68vh',
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
	suce: {
		fontSize: '20px',
		color: ' #4F4F4F',
		fontFamily: 'Poppins, sans-serif',
		fontStyle: 'normal',
		fontWeight: '800',
		lineHeight: '27px',
		marginTop: '2%',
	},
	status: {
		marginTop: '4%',
		color: '#fff',
		background: '#219653',
		borderRadius: '40px',
		padding: '6px 6px',
	},
	copyText: {
		width: '100%',
		border: '1px solid #E0E0E0',
		background: '#F6F8FB',
		borderRadius: '4px',
		height: '6vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 2px',
	},
	inputText: {
		width: '82%',
		border: 'none',
		background: 'none',
		outline: 'none',
	},
	btn: {
		background: ' #2F80ED',
		color: '#fff',
		height: '5vh',
		borderRadius: '4px',
		border: 'none',
		cursor: 'pointer',
	},
	loading: {
		marginTop: '10px',
		fontSize: '20px',
		color: ' #4F4F4F',
		fontWeight: 'bold',
		fontFamily: 'Poppins, sans-serif',
		marginBottom: '20px',
	},
}));

function Dahboard() {
	const classes = useStyles();
	const [imageAsUrl, setImageAsUrl] = useState('');
	const [loading, setLoading] = useState(false);

	const handleDrop = (files) => {
		setLoading(true);
		files.forEach((f) => {
			const metadata = {
				contentType: f.type,
			};
			const uploadTask = storage.ref(`/images/${f.name}`).put(f, metadata);
			uploadTask.on(
				'state_changed',
				(snapShot) => {
					console.log(snapShot);
					setLoading(true);
				},
				(err) => {
					console.log(err);
					setLoading(false);
				},
				// eslint-disable-next-line no-loop-func
				() => {
					storage
						.ref('images')
						.child(f.name)
						.getDownloadURL()
						.then((fireBaseUrl) => {
							setLoading(false);
							setImageAsUrl(fireBaseUrl);
						});
				}
			);
		});
	};

	const myFunction = () => {
		var copyText = document.getElementById('myInput');
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand('copy');
		console.log(';;;;;;;;;;;', copyText);
	};

	const handleChange = (e) => {
		console.log(e.target.files);
		const metadata = {
			contentType: e.target.files[0].type,
		};
		const uploadTask = storage
			.ref(`/images2/${e.target.files[0].name}`)
			.put(e.target.files[0], metadata);
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
					.ref('images2')
					.child(e.target.files[0].name)
					.getDownloadURL()
					.then((BaseUrl) => {
						console.log(BaseUrl);
						setImageAsUrl(BaseUrl);
					});
			}
		);
	};

	return imageAsUrl === '' ? (
		<div>
			<Grid
				className={classes.root}
				container
				alignItems='center'
				justifyContent='center'
			>
				<Grid item xs={12} sm={6} md={6} lg={5}>
					{loading === false ? (
						<Paper className={classes.paper}>
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
					) : (
						<Paper>
							<CardContent>
								<Typography
									variant='h1'
									className={classes.loading}
									component='h2'
								>
									Uploading...
								</Typography>
								<div className='Applogo'>
									<div className='inner'></div>
								</div>
							</CardContent>
						</Paper>
					)}
				</Grid>
			</Grid>
		</div>
	) : (
		<div>
			<Grid
				className={classes.root}
				container
				alignItems='center'
				justifyContent='center'
			>
				<Grid item xs={12} sm={6} md={6} lg={5}>
					<Paper className={classes.paper}>
						<div>
							<VscCheck size={36} className={classes.status} />
						</div>
						<Typography variant='h1' className={classes.suce} component='h2'>
							Uploaded Successfully!
						</Typography>
						<CardContent>
							<div
								style={{
									width: '100%',
									borderRadius: '10px',
									marginBottom: '20px',
								}}
							>
								<img
									style={{
										height: '50vh',
										width: '100%',
										borderRadius: '10px',
										objectFit: 'cover',
									}}
									src={imageAsUrl}
									alt='logo'
								/>
								;
							</div>
							<div className={classes.copyText}>
								<input
									type='text'
									id='myInput'
									className={classes.inputText}
									defaultValue={imageAsUrl}
								/>
								<button
									className={classes.btn}
									type='click'
									onClick={() => myFunction()}
								>
									Copy text
								</button>
							</div>
						</CardContent>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Dahboard;
