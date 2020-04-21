const initialState = {
    customRoutes: []
}

export default function rootReducer(state = initialState, action) {

    switch(action.type) {
        case 'GET_ROUTES':
            return {
                
            }
        default:
            return state;
    }
}