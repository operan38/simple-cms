import { combineReducers } from 'redux';

import routesReducer from './routes';
import authReducer from './auth';
import registerReducer from './register';
import containersReducer from './containers';
import customContainerReducer from './customContainer';
import usersReducer from './users';
import postsReducer from './posts';
import modalReducer from './modal';
import commentsReducer from './comments';

export default combineReducers({
	routes: routesReducer,
	containers: containersReducer,
	customContainer: customContainerReducer,
	users: usersReducer,
	auth: authReducer,
	register: registerReducer,
	posts: postsReducer,
	modal: modalReducer,
	comments: commentsReducer,
});
