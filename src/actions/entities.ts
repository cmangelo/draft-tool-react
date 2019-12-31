import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';

// import * as types from './actiontypes';

export const entitiesActionTypes = {
    LOAD_PLAYERS_PENDING: '[Rankings] Load Players Pending',
    LOAD_PLAYERS: '[Rankings] Load Players',
    LOAD_TIERS: '[Rankings] Load Tiers',
    LOAD_GROUPS: '[Rankings] Load Groups'
};

export const loadPlayersPending = () => ({
    type: entitiesActionTypes.LOAD_PLAYERS_PENDING
});

export const loadPlayers = (players: { [id: string]: IPlayer }) => ({
    type: entitiesActionTypes.LOAD_PLAYERS,
    payload: {
        players
    }
});

export const loadTiers = (tiers: { [id: string]: ITier }) => ({
    type: entitiesActionTypes.LOAD_TIERS,
    payload: {
        tiers
    }
});

export const loadGroups = (groups: { [id: string]: IGroup }) => ({
    type: entitiesActionTypes.LOAD_GROUPS,
    payload: {
        groups
    }
});
