import {ADD_PEER , REMOVE_PEER} from "../Actions/peerActions.js";
export const peerReducers = (state, action) => {
    console.log('Reducer action:', action);
    console.log('State before:', state);

    switch (action.type) {
        case ADD_PEER:
            const newState = {
                ...state,
                [action.payload.peerId]: {
                    stream: action.payload.stream,
                },
            };
            console.log('State after ADD_PEER:', newState);
            return newState;

        case REMOVE_PEER:
            const { [action.payload.peerId]: removedPeer, ...updatedState } = state;
            console.log('State after REMOVE_PEER:', updatedState);
            return updatedState;

        default:
            return state;
    }
};
