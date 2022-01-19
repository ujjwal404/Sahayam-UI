import React, { useEffect, useState } from 'react';
import './navbar.scss';
import { Popover } from 'react-tiny-popover';
import Profile from '../Profile/Profile';
import { useLocation } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
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
		<nav>
			<div className="nav-bar">
				<h1>Sahayam</h1>
				<div className="nav-links">
					<button className="signout-btn" onClick={() => SignOut()}>
						Sign Out
						<AiOutlineLogout style={{ transform: 'translateY(3px)', marginLeft: '4px' }} />
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
