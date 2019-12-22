import * as types from '../actiontypes';

const initialState = {
    players: {},
    tiers: {},
    groups: {},
    loading: false
}

export default function (state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case types.LOAD_PLAYERS_PENDING:
            return {
                ...state,
                loading: true
            }
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

export const getPlayers = (state: any) => state.entities.players;
export const getTiers = (state: any) => state.entities.tiers;
export const getGroups = (state: any) => state.entities.groups;