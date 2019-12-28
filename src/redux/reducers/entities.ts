import { createSelector } from 'reselect';

import { IGroup } from '../../models/group.interface';
import { IPlayer } from '../../models/player.interface';
import { ITier } from '../../models/tier.interface';
import * as types from '../actiontypes';

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
        case types.DRAFT_PLAYER:
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

export const getGroupsWithPlayers = createSelector(
    [getPlayers, getTiers, getGroups],
    (players: { [_id: string]: IPlayer }, tiers: { [_id: string]: ITier }, groups: { [_id: string]: IGroup }) => {
        if (!Object.keys(players).length || !Object.keys(tiers).length || !Object.keys(groups).length) return [];
        //change this filter to be visible players -- we'll need to keep track of which players are visible in Rankings state
        console.log(groups)
        return Object.keys(groups)
            .map(key => groups[key])
            .filter(group => group.position === 0)
            .map(group => {
                const groupTiers = (group.tiers as Array<string>)
                    .map((tierId: string) => tiers[tierId])
                    .map(tier => {
                        const tierPlayers = (tier.players as Array<string>).map(playerId => players[playerId]);
                        return { ...tier, players: tierPlayers };
                    });
                return { ...group, tiers: groupTiers };
            }).sort((a, b) => a.position > b.position ? 1 : -1);
    }
);