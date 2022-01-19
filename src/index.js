import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from 'apollo-link-context';

const local = 'http://localhost:8080/api';
const uri = 'https://sahayam-api.herokuapp.com/api';

const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: (await localStorage.getItem('AUTH_TOKEN')) || ''
		}
	};
});

const client = new ApolloClient({
	// link: authLink.concat(httpLink),
	link: httpLink,
	cache,
	name: 'sahayam-web-client',
	version: '1.0',
	resolvers: {},
	connectToDevTools: true
});

//const data = {
//  loggedIn: !!localStorage.getItem('token')
//}
//
//cache.modify({data});
//
//client.resetStore(() => cache.modify({data}));

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
