import * as types from '../actiontypes';

const initialState = {
    players: {},
    tiers: {},
    groups: {}
}

export default function (state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case types.LOAD_PLAYERS:
            return {
                ...state,
                players: action.payload.players
            }
        case types.LOAD_TIERS:
            return {
                ...state,
                tiers: action.payload.tiers
            }
        case types.LOAD_GROUPS:
            return {
                ...state,
                groups: action.payload.groups
            }
        default:
            return state;
    }
};