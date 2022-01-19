import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { gql, useMutation } from '@apollo/client';
import { parse } from 'graphql';
import { useHistory } from 'react-router-dom';
const POST_TASK = gql`
	mutation postTask($task: InputTask!) {
		post(task: $task) {
			title
			description
			location
			volRequired
			criteria
			imageURL
			tags
			ngo {
				name
				email
				location
				contact
				fields
			}
		}
	}
`;

function AddTask() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [volRequired, setVolRequired] = useState('');
	const [criteria, setCriteria] = useState('');
	const [tags, setTags] = useState([]);
	const [imageURL, setImageURL] = useState('');
	const history = useHistory();
	const [post, { loading, error }] = useMutation(POST_TASK, {
		onCompleted: (data) => {
			console.log(data);
			setTitle('');
			setDescription('');
			setLocation('');
			setCriteria('');
			setVolRequired('');
			setImageURL('');
			setTags([]);
			history.push('/dashboard');
		},
		onError: (error) => {
			console.log(error.message);
		}
	});

	function onTaskSubmit(e) {
		e.preventDefault();
		if (volRequired < 1 || volRequired > 100) {
			alert('Volunteers required must be between 1 and 100');
			return;
		}
		const task = { title, description, location, volRequired, criteria, imageURL, tags };
		post({ variables: { task } });
		// console.log(task);
	}

	return (
		<div className="add-task">
			<div className="white-page">
				<Link to="/dashboard">
					<button className="back">Back to Dashboard</button>
				</Link>
				<div className="task-form">
					<h1>Add Post</h1>
					<form onSubmit={(e) => onTaskSubmit(e)}>
						<input
							type="text"
							required
							placeholder="Title"
							value={title}
							minLength="2"
							maxLength="40"
							onChange={(e) => setTitle(e.target.value)}
						/>
						<input
							type="text"
							required
							minLength="10"
							maxLength="200"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<input
							type="text"
							required
							minLength="2"
							maxLength="40"
							placeholder="Location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
						<input
							type="text"
							minLength="1"
							maxLength="3"
							required
							pattern="[1-9]{1,3}"
							placeholder="Volunteers Required"
							value={volRequired}
							onChange={(e) => setVolRequired(e.target.value)}
						/>
						<input
							type="text"
							required
							placeholder="Criteria"
							value={criteria}
							onChange={(e) => setCriteria(e.target.value)}
						/>
						<input
							type="text"
							required
							pattern="https?://.+"
							minLength="10"
							maxLength="200"
							placeholder="imageURL"
							value={imageURL}
							onChange={(e) => setImageURL(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Tags"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
						/>
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AddTask;
