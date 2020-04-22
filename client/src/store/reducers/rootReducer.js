import {combineReducers} from 'redux';
import routesReducer from './routes';
import containersReducer from './containers';
import customContainersReducer from './customContainers';

export default combineReducers({
    routes: routesReducer,
    containers: containersReducer,
    customContainers: customContainersReducer
})