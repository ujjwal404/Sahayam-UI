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

	const [check] = useMutation(CHECK_VOLUNTEER, {
		onCompleted: (data) => {
			console.log(context.id);
			setVol(data.volunteer);
		},
		onError: (error) => console.log(error.message)
	});

	useEffect(() => {
		console.log(details);
		tasks.map((task) => {
			if (task.id === context.id) setVol(true);
		});
	}, []);

	function handleApply(e) {
		e.preventDefault();
		check({ variables: { id: context.id } });
	}

	return (
		<div>
			<div className="container">
				<div className="post-card">
					<div className="post-card__nav">
						<ul>
							<li>
								<span>
									<AiFillEye />
								</span>
							</li>
							<li>
								<span>
									<FaMapMarkerAlt />
								</span>
							</li>
							<li>
								<span>
									<AiFillTag />
								</span>
							</li>
						</ul>
					</div>
					<div className="post-card__content">
						<div className="post-card__info">
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
							<a href="#">Read more</a>
						</div>
					</div>
					<div className="post-card__img" id="post-card__img">
						<img
							src="https://images.unsplash.com/photo-1642412996731-79a59c47ff61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
							alt="img"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Post;
