import { draftActionTypes } from '../actions/draft';
import { entitiesActionTypes } from '../actions/entities';
import { rankingsActionTypes } from '../actions/rankings';
import { userActionTypes } from '../actions/user';
import { userRanksActionTypes } from '../actions/user-ranks';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { IGroup } from '../models/group.interface';
import { IPick } from '../models/pick.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';

export interface EntitiesState {
    players: { [key: string]: IPlayer }
    tiers: { [key: string]: ITier }
    groups: { [key: string]: IGroup },
    kickerId: string,
    defenseId: string,
    loading: boolean
}

const initialState: EntitiesState = {
    players: {},
    tiers: {},
    groups: {},
    kickerId: '',
    defenseId: '',
    loading: false
}

export default function (state = initialState, action: { type: string, payload: any }) {
    let playerId;
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
        case entitiesActionTypes.LOAD_SPECIAL_PLAYERS:
            return {
                ...state,
                defenseId: action.payload.defenseId,
                kickerId: action.payload.kickerId,
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
            playerId = action.payload.playerId as string;
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
        case userRanksActionTypes.RANK_PLAYER:
            const ranking = action.payload.ranking as UserRanking;
            playerId = action.payload.playerId as string;
            return {
                ...state,
                players: {
                    ...state.players,
                    [playerId]: {
                        ...state.players[playerId],
                        userRank: ranking
                    }
                }
            }
        case userRanksActionTypes.DELETE_RANK:
            playerId = action.payload.playerId as string;
            return {
                ...state,
                players: {
                    ...state.players,
                    [playerId]: {
                        ...state.players[playerId],
                        userRank: undefined
                    }
                }
            }
        case draftActionTypes.LOAD_DRAFT:
            const picks = action.payload.picks as Array<IPick>;
            const newPlayers = { ...state.players };
            picks.forEach(pick => {
                newPlayers[pick.player].drafted = true;
            });
            return {
                ...state,
                players: newPlayers
            }
        case userRanksActionTypes.GET_PLAYER_DETAIL_SUCCESS:
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.payload.player._id]: {
                        ...state.players[action.payload.player._id],
                        ...action.payload.player
                    }
                }
            }
        case userActionTypes.USER_LOGGED_OUT:
            return initialState;
        default:
            return state;
    }
};

export const getPlayers = (state: any) => state.entities.players;
export const getTiers = (state: any) => state.entities.tiers;
export const getGroups = (state: any) => state.entities.groups;
export const getKickerId = (state: any) => state.entities.kickerId;
export const getDefenseId = (state: any) => state.entities.defenseId;