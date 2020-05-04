import { createSelector } from 'reselect';

import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { getGroups, getPlayers, getTiers } from '../reducers/entities';
import { getVisibleGroups } from '../reducers/user-ranks';


export const getGroupsWithPlayers = createSelector(
    [getPlayers, getTiers, getGroups, getVisibleGroups],
    (players: { [_id: string]: IPlayer }, tiers: { [_id: string]: ITier }, groups: { [_id: string]: IGroup }, visibleGroups: { [key: number]: boolean }) => {
        if (!Object.keys(players).length || !Object.keys(tiers).length || !Object.keys(groups).length) return [];

        return createGroups(players, tiers, groups, visibleGroups);
    }
);

export const createGroups = (players: { [_id: string]: IPlayer }, tiers: { [_id: string]: ITier }, groups: { [_id: string]: IGroup }, visibleGroups: { [key: number]: boolean }) => {
    if (!Object.keys(players).length || !Object.keys(tiers).length || !Object.keys(groups).length) return [];

    return Object.keys(groups)
        .map(key => groups[key])
        .filter(group => visibleGroups[group.position])
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