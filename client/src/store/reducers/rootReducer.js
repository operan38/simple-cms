import {combineReducers} from 'redux';
import routesReducer from './routes';
import containersReducer from './containers';

export default combineReducers({
    routes: routesReducer,
    containers: containersReducer
})