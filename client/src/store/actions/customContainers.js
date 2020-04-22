import httpCustom from '../../axios/http-custom';

import { FETCH_CUSTOM_CONTAINERS_START, FETCH_CUSTOM_CONTAINERS_SUCCESS, FETCH_CUSTOM_CONTAINERS_ERROR } from './type';

// GET

export function fetchCustomContainers(path) {

    return async dispath => {

        dispath(fetchCustomContainersStart());

        try {
            const response = await httpCustom.post(path);
            dispath(fetchCustomContainersSuccess(response.data));

        } catch (e) {
            dispath(fetchCustomContainersError(e));
        }
    }
}

export function fetchCustomContainersStart() {
    return {
        type: FETCH_CUSTOM_CONTAINERS_START
    }
}

export function fetchCustomContainersSuccess(customContainersList) {
    return {
        type: FETCH_CUSTOM_CONTAINERS_SUCCESS,
        customContainersList
    }
}

export function fetchCustomContainersError(e) {
    return {
        type: FETCH_CUSTOM_CONTAINERS_ERROR,
        error: e
    }
}