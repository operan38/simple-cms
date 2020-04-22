import { FETCH_CUSTOM_CONTAINERS_START, FETCH_CUSTOM_CONTAINERS_SUCCESS, FETCH_CUSTOM_CONTAINERS_ERROR } from '../actions/type';

const initalState = {
    customContainersList: [],
    loading: false,
    error: null
}

export default function customContainerReducer(state = initalState, action) {
    switch (action.type) {
        case FETCH_CUSTOM_CONTAINERS_START:
            return {
                ...state, loading: true
            }
        case FETCH_CUSTOM_CONTAINERS_SUCCESS:
            return {
                ...state, loading: false, customContainersList: action.customContainersList
            }
        case FETCH_CUSTOM_CONTAINERS_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        default:
            return state;
    }
}