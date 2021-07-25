import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
	root: {
		border: '1px  #97BEF4',
		borderStyle: 'dashed',
		borderRadius: '6px',
		boxShadow: 'none',
		background: '#F6F8FB',
		height: '36vh',
		width: '100%',
		margin: 'auto',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

function DragAndDrop(props) {
	let dragCounter = 0;

	const classes = useStyles();

	const [drag, setDrag] = useState(false);

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragIn = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dragCounter++;
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setDrag(true);
		}
	};
	const handleDragOut = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dragCounter--;
		if (dragCounter === 0) {
			setDrag(false);
		}
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDrag(false);
		console.log(e.dataTransfer.files);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			props.handleDrop(e.dataTransfer.files);
			e.dataTransfer.clearData();
			dragCounter = 0;
		}
	};

	return (
		<Card className={classes.root}>
			<CardContent>
				<div
					style={{ display: 'inline-block', position: 'relative' }}
					onDrop={handleDrop}
					onDragEnter={handleDragIn}
					onDragOver={handleDrag}
					onDragLeave={handleDragOut}
					accept='image/x-png, image/jpeg'
				>
					{drag && (
						<div
							style={{
								backgroundColor: 'rgba(255, 255, 255, .78)',
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: 0,
								right: 0,
								zIndex: 9999,
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: '50%',
									right: 0,
									left: 0,
									textAlign: 'center',
									color: 'grey',
									fontSize: 36,
								}}
							>
								<div>drop here :)</div>
							</div>
						</div>
					)}
					{props.children}
				</div>
			</CardContent>
		</Card>
	);
}

export default DragAndDrop;
