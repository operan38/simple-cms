import {combineReducers} from 'redux';
import routesReducer from './routes';

export default combineReducers({
    routes: routesReducer
})