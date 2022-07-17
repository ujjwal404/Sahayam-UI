import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './authui.scss';
import image from './auth.svg';
import { gql, useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';

const SIGNUP_MUTATION = gql`
	mutation signUp($ngo: InputNGO) {
		registerNGO(ngo: $ngo)
	}
`;

function NGOauth() {
	const history = useHistory();
	const [show, setShow] = useState('login');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const [about, setAbout] = useState('');
	const [contact, setContact] = useState('');
	const [location, setLocation] = useState('');
	const [field, setField] = useState([]);

	const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
		onCompleted: (data) => {
			console.log(data);
			localStorage.setItem('AUTH_TOKEN', data.registerNGO);
			history.push('/dashboard');
			NotificationManager.success("Successfully registered as NGO.")
		},
		onError: (error) => {
			console.log(error.message);
			NotificationManager.error(`${error.message}`)
		}
	});
	
	function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
	// signup NGO
	function onSubmit(e) {
		e.preventDefault();
		const ngo = { email, password, name, about, contact, location };
		Object.keys(ngo).map((key, index) => {
			if (ngo[key] == '') {
				console.log("Field can't be empty");
				// will use notification
				return;
			}
		});
		if (!isNumeric(contact)) {
			NotificationManager.error("Please enter a valid contact number");
			return;
		}
		signup({ variables: { ngo } });
	}

	return (
		<>
			<div className="auth-container">
				<div className="auth-left">
					<h1 className="website-head">Sahayam</h1>
					<div className="img-holder">
						<img src={image} alt="auth-svg" />
					</div>
				</div>
				<div className="auth-right">
					<div className="form-content">
						<div className="form-heading">
							<h1>Register your NGO</h1>
							<h1></h1>
						</div>
						<div className="line">
							<p>NGO Auth</p>
						</div>

						<div className="form-inputs">
							<form onSubmit={(e) => onSubmit(e)}>
								<input
									type="email"
									required
									placeholder="E-mail Address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<input
									type="password"
									required
									placeholder="Password"
									minLength='6'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<input
									type="text"
									placeholder="About"
									minLength="10"
									required
									value={about}
									onChange={(e) => setAbout(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Contact"
									required
									value={ contact }
									minLength="10"
									maxLength="10"
									onChange={(e) => setContact(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Location (city, country)"
									required
									value={location}
									onChange={(e) => setLocation(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Field"
									value={field}
									onChange={(e) => setField(e.target.value)}
								/>
							
								<div className="submit-btn">
									<button type="submit">Register</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default NGOauth;
