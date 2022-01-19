import React, { useEffect, useState } from 'react';
import './Post.scss';
import icon from './placeholder.png';
import ngoicon from './ngo (1).png';
import { useMutation, gql, useQuery } from '@apollo/client';
import Loading from '../Extras/Loading';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import { AiFillTag } from 'react-icons/ai';

const CHECK_VOLUNTEER = gql`
	mutation checkVolunteer($id: ID!) {
		volunteer(id: $id)
	}
`;

const USER = gql`
	query getUser {
		me {
			tasks {
				id
			}
		}
	}
`;

function Post({ tasks, context, isNGO }) {
	const details = context;
	const [vol, setVol] = useState();
	const [content, setContent] = useState(true);
	const [location, setLocation] = useState(false);
	const [show, setShow] = useState(false);

	const [color1, setColor1] = useState('#985EFF');
	const [color2, setColor2] = useState('#2d3f53');

	const [check] = useMutation(CHECK_VOLUNTEER, {
		onCompleted: (data) => {
			console.log(context.id, data.volunteer);
			setVol(data.volunteer);
		},
		onError: (error) => console.log(error.message)
	});

	useEffect(() => {
		console.log(details);
		tasks.map((task) => {
			if (task.id === context.id) setVol(true);
		});
	}, [context.id, details, tasks]);

	function handleApply(e) {
		e.preventDefault();

		check({ variables: { id: context.id } });
	}

	function cardContent({ details }) {
		return (
			<div className="post-card__info">
				<div>
					<h1>{details.title}</h1>
					<h5>
						NGO : <span>{details.ngo.name}</span>
					</h5>
					<p>
						{details.description}
						-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas doloribus dolorum
						ratione optio. Tenetur id fugiat totam, ducimus velit? Officia mollitia reiciendis
						ipsum!
					</p>
				</div>
				<div>
					<div className="post-card__info__vols">
						<div className="vol-req">
							<p>{details.volRequired} Volunteers required</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function cardLocation({ details }) {
		return (
			<div className="post-card__info">
				<h1>Task location</h1>
				<p>{details.location}</p>
			</div>
		);
	}

	function cardApply({ details }) {
		return !isNGO ? (
			<div className="post-card__info">
				<div className="post-card__apply-heading">
					<h3>{vol ? 'Already applied' : 'Apply for this task'}</h3>
					<p>{vol ? 'You have applied for this task' : 'Apply for this task'}</p>
				</div>
				<button className="apply-btn" onClick={handleApply}>
					{vol ? 'Applied' : 'Apply'}
				</button>
			</div>
		) : (
			<div>
				<p>
					To volunteer in these tasks please register yourself as an user or add your own tasks.
				</p>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="post-card">
				<div className="post-card__nav">
					<ul>
						<li>
							<span
								style={{ backgroundColor: content === true ? color1 : color2 }}
								onClick={() => {
									setLocation(false);
									setShow(false);
									setContent(true);
									// set color to red
								}}
							>
								<AiFillEye />
							</span>
						</li>
						<li>
							<span
								style={{ backgroundColor: location === true ? color1 : color2 }}
								onClick={() => {
									setShow(false);
									setContent(false);
									setLocation(true);
								}}
							>
								<FaMapMarkerAlt />
							</span>
						</li>

						<li>
							<span
								style={{ backgroundColor: show === true ? color1 : color2 }}
								onClick={() => {
									setLocation(false);
									setContent(false);
									setShow(true);
								}}
							>
								<AiFillTag />
							</span>
						</li>
					</ul>
				</div>
				<div className="post-card__content">
					{content && cardContent({ details })}
					{location && cardLocation({ details })}
					{show && cardApply({ details })}
				</div>
				<div className="post-card__img" id="post-card__img">
					<img
						src={
							details.imageURL ||
							'https://images.unsplash.com/photo-1642412996731-79a59c47ff61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
						}
						alt="img"
					/>
				</div>
			</div>
		</div>
	);
}

export default Post;
