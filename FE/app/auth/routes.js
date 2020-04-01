import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import Content from '../components/Content/index';
import { isLogin, login, isAuth } from '../utils/auth';

const URL = "http://localhost:3000";


function PrivateRoute(props) {
	const { key, path, component, routes } = props;
	const returnUrl = URL + path;
	
	const token = new URLSearchParams(routes.search).get("accessToken");

	if(token) {
		localStorage.setItem('user_token', token);
		// window.location.replace(returnUrl);
	}

	return (
		<Route
			key={key}
			path={path}
			exact
			render={() =>
				isAuth() ?
					(<Content>
						{component()}
					</Content>)
					:
					window.location.replace("https://home.kms-technology.com/login?returnUrl=" + returnUrl)
					// console.log("a")
				}
		/>
	)
}

export default PrivateRoute;
