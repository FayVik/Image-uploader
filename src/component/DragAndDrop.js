import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { AiOutlineCloudUpload } from 'react-icons/ai';

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

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = 'copy';
	};

	const handleDragIn = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dragCounter++;
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
		}
	};
	const handleDragOut = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dragCounter--;
		if (dragCounter === 0) {
		}
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let files = [...e.dataTransfer.files];
		if (files && files.length > 0) {
			console.log(files);
			props.handleDrop(files);
			e.dataTransfer.clearData();
		}
		console.log(e.dataTransfer.getData('file'));
	};

	return (
		<Card className={classes.root}>
			<CardContent>
				<div
					style={{ display: 'inline-block', position: 'relative' }}
					onDrop={(e) => handleDrop(e)}
					onDragEnter={(e) => handleDragIn(e)}
					onDragOver={(e) => handleDrag(e)}
					onDragLeave={(e) => handleDragOut(e)}
					accept='image/x-png, image/jpeg'
				>
					<AiOutlineCloudUpload size={80} />
					<p>Drag files here to upload</p>

					{props.children}
				</div>
			</CardContent>
		</Card>
	);
}

export default DragAndDrop;
