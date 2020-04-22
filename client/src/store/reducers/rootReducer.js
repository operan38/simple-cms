import {combineReducers} from 'redux';
import routesReducer from './routes';
import containersReducer from './containers';
import customContainerReducer from './customContainer';

export default combineReducers({
    routes: routesReducer,
    containers: containersReducer,
    customContainer: customContainerReducer
})