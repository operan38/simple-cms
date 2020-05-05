import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from './components/UI/Loader/Loader';

const Custom = lazy(() => import('./containers/Custom/Custom'));
const Routes = lazy(() => import('./containers/Routes/Routes'));
const Users = lazy(() => import('./containers/Users/Users'));
const Posts = lazy(() => import('./containers/Posts/Posts'));
const Post = lazy(() => import('./containers/Post/Post'));
const Home = lazy(() => import('./containers/Home/Home'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Profile = lazy(() => import('./containers/Profile/Profile'));
const Register = lazy(() => import('./containers/Register/Register'));
const NotFound = lazy(() => import('./containers/NotFound/NotFound'));

class RoutesList extends Component {
	updateCustomRoutesList = () => {
		return this.props.customRoutes.map((route, index) => {
			return (
				<Route
					key={index}
					path={route.path}
					render={(props) => (
						<Custom {...props} container={route.container_title} />
					)}
				/>
			);
		});
	};

	render() {
		return (
			<Suspense fallback={<Loader />}>
				<Switch>
					<Route exact path='/' component={Home} />

					{!this.props.isAuthenticated ? (
						<Route path='/auth' component={Auth} />
					) : (
						<Redirect from='/auth' to='/' />
					)}

					{!this.props.isAuthenticated ? (
						<Route path='/reg' component={Register} />
					) : (
						<Redirect from='/reg' to='/' />
					)}

					{this.props.isAuthenticated ? (
						<Route path='/profile' component={Profile} />
					) : (
						<Redirect from='/profile' to='/' />
					)}

					<Route path='/admin/routes' component={Routes} />
					<Route path='/admin/users' component={Users} />

					<Route path='/posts' component={Posts} />
					<Route path='/post/:id' component={Post} />

					{this.props.customRoutes.length !== 0
						? this.updateCustomRoutesList()
						: ''}

					<Route path='*' component={NotFound} />
				</Switch>
			</Suspense>
		);
	}
}

function mapStateToProps(state) {
	return {
		customRoutes: state.routes.customRoutes,
		isAuthenticated: !!state.auth.payload,
	};
}

export default connect(mapStateToProps, null)(RoutesList);
