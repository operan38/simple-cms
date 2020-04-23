import httpCustom from '../../axios/http-custom';
import { FETCH_CUSTOM_CONTAINER_START, FETCH_CUSTOM_CONTAINER_SUCCESS, FETCH_CUSTOM_CONTAINER_ERROR } from './type';

// GET

export function fetchCustomContainerByPath(path) {

    return async dispath => {

        dispath(fetchCustomContainerStart());

        try {
            const response = await httpCustom.post(path);
            dispath(fetchCustomContainerSuccess(response.data));

        } catch (e) {
            dispath(fetchCustomContainerError(e));
        }
    }
}

export function fetchCustomContainerStart() {
    return {
        type: FETCH_CUSTOM_CONTAINER_START
    }
}

export function fetchCustomContainerSuccess(list) {
    return {
        type: FETCH_CUSTOM_CONTAINER_SUCCESS,
        list
    }
}

export function fetchCustomContainerError(e) {
    return {
        type: FETCH_CUSTOM_CONTAINER_ERROR,
        error: e
    }
}