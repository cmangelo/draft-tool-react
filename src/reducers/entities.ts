import { entitiesActionTypes } from '../actions/entities';
import { rankingsActionTypes } from '../actions/rankings';
import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';

interface State {
    players: { [key: string]: IPlayer }
    tiers: { [key: string]: ITier }
    groups: { [key: string]: IGroup },
    loading: boolean
}

const initialState: State = {
    players: {},
    tiers: {},
    groups: {},
    loading: false
}

export default function (state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case entitiesActionTypes.LOAD_PLAYERS_PENDING:
            return {
                ...state,
                loading: true
            }
        case entitiesActionTypes.LOAD_PLAYERS:
            return {
                ...state,
                players: action.payload.players
            }
        case entitiesActionTypes.LOAD_TIERS:
            return {
                ...state,
                tiers: action.payload.tiers
            }
        case entitiesActionTypes.LOAD_GROUPS:
            return {
                ...state,
                groups: action.payload.groups
            }
        case rankingsActionTypes.DRAFT_PLAYER:
            const playerId = action.payload.playerId as string;
            return {
                ...state,
                players: {
                    ...state.players,
                    [playerId]: {
                        ...state.players[playerId],
                        drafted: true
                    }
                }
            }
        default:
            return state;
    }
};

export const getPlayers = (state: any) => state.entities.players;
export const getTiers = (state: any) => state.entities.tiers;
export const getGroups = (state: any) => state.entities.groups;

