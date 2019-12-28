import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import * as types from './actiontypes';

export const loadPlayersPending = () => ({
    type: types.LOAD_PLAYERS_PENDING
});

export const loadPlayers = (players: { [id: string]: IPlayer }) => ({
    type: types.LOAD_PLAYERS,
    payload: {
        players
    }
});

export const loadTiers = (tiers: { [id: string]: ITier }) => ({
    type: types.LOAD_TIERS,
    payload: {
        tiers
    }
});

export const loadGroups = (groups: { [id: string]: IGroup }) => ({
    type: types.LOAD_GROUPS,
    payload: {
        groups
    }
});

export const draftPlayer = (playerId: string) => ({
    type: types.DRAFT_PLAYER,
    payload: {
        playerId
    }
});