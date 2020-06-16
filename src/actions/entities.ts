import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';

export const entitiesActionTypes = {
    LOAD_PLAYERS_PENDING: '[Rankings] Load Players Pending',
    LOAD_PLAYERS: '[Rankings] Load Players',
    LOAD_SPECIAL_PLAYERS: '[Rankings] Load Special Players',
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

export const loadSpecialPlayers = (defenseId: string, kickerId: string) => ({
    type: entitiesActionTypes.LOAD_SPECIAL_PLAYERS,
    payload: {
        defenseId,
        kickerId
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
