import { combineReducers } from 'redux';

import routesReducer from './reducers/routes';
import authReducer from './reducers/auth';
import registerReducer from './reducers/register';
import containersReducer from './reducers/containers';
import customContainerReducer from './reducers/customContainer';
import usersReducer from './reducers/users';
import postsReducer from './reducers/posts';
import modalReducer from './reducers/modal';
import commentsReducer from './reducers/comments';
import headerNavReducer from './reducers/headerNav';

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
	headerNav: headerNavReducer,
});
