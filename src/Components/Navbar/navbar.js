import React, { useEffect, useState } from 'react';
import './navbar.scss';
import { Popover } from 'react-tiny-popover';
import Profile from '../Profile/Profile';
import { useLocation } from 'react-router-dom';

function Navbar() {
	let location = useLocation();
	let path = location.pathname;

	function SignOut() {
		// sign out user
		localStorage.removeItem('AUTH_TOKEN');
		window.location = '/';
	}

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	useEffect(() => {
		// console.log(path);
	});

	return (
		<nav className="nav-bar">
			<h1>Sahayam</h1>
			<div classname="nav-links">
				<button className="signout-btn" onClick={() => SignOut()}>
					Sign Out
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
