import React, { useEffect, useState } from 'react';
import './dashboard.scss';
import Post from '../Posts/Post';
import { Link, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import Layout from '../Layout/Layout';

import { gql, useQuery } from '@apollo/client';
import Loading from '../Extras/Loading';
import { BiBookAdd } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';

const GET_POSTS = gql`
	query Feed($tags: [String]) {
		feed(tags: $tags) {
			id
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

const GET_NGOS = gql`
	query getngo {
		getNGOs {
			name
		}
	}
`;
const GET_USER = gql`
	query getUser {
		me {
			name
			contact
			email
			location
			tasks {
				id
			}
		}
	}
`;

const GET_NGO = gql`
	query getNGO {
		NGOme {
			name
			email
			location
			contact
			about
		}
	}
`;

function Dashboard() {
	const [isPopoverOpen, setIsPopoverOpen] = useState(true);
	const history = useHistory();

	const res1 = useQuery(GET_POSTS, { variables: { tags: [] } });
	const res2 = useQuery(GET_NGOS);
	const res3 = useQuery(GET_USER);
	const res4 = useQuery(GET_NGO);

	const [posts, setPosts] = useState([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('AUTH_TOKEN');
		const check = jwt.decode(token);
		setShow(check.ngo);

		window.addEventListener('popstate', () => {
			history.go(1);
		});
	}, []);

	if (res1.loading || res2.loading || res3.loading || res4.loading) return <Loading />;
	if (res1.error) return `Error! ${res1.error.message}`;
	// if (res4.error) return `Error! ${res4.error.message}`;

	return (
		<Layout>
			<div className="main-dashboard-darktheme">
				<div className="content">
					{res1.data.feed.map((post, index) => (
						<Post
							key={index}
							context={{ ...post, index }}
							isNGO={show}
							tasks={show ? [] : res3.data.me.tasks}
						/>
					))}
				</div>
				<div className="sidebar">
					<div className="sidebar-sticky">
						<div className="post-box">
							{show && (
								<div className="add-post-btn">
									<Link to="/addTask">
										<button>
											Add Task <BiBookAdd />
										</button>
									</Link>
								</div>
							)}
							<div className="NGOlist">
								<p>NGOs registered with us :</p>
								<div className="ngos">
									<ul>
										{!res1.loading &&
											res2.data.getNGOs.map((ngo) => <li key={ngo.name}>{ngo.name}</li>)}
									</ul>
								</div>
							</div>
						</div>
						<div className="post-box">
							<div className="profile-box">
								<div className="profile-heading">
									<h4>Your Profile </h4>
									<span>
										<BsFillPersonFill />
									</span>
								</div>
								{show ? (
									<div>
										{/* <p> NGO name : {res4.data.NGOme.name}</p>
										<p> email : {res4.data.NGOme.email}</p>
										<p> contact : {res4.data.NGOme.contact}</p>
										<p> location : {res4.data.NGOme.location}</p>
										<p> about : {res4.data.NGOme.about}</p> */}
									</div>
								) : (
									<div>
										{/* <p> name : {res3.data.me.name}</p>
										<p> email : {res3.data.me.email}</p>
										<p> contact : {res3.data.me.contact}</p>
										<p> location : {res3.data.me.location}</p> */}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Dashboard;
