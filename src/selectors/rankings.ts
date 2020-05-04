import { createSelector } from 'reselect';

import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { getGroups, getPlayers, getTiers } from '../reducers/entities';
import { getVisibleGroups } from '../reducers/rankings';
import { createGroups } from './user-ranks';


export const getGroupsWithPlayers = createSelector(
    [getPlayers, getTiers, getGroups, getVisibleGroups],
    (players: { [_id: string]: IPlayer }, tiers: { [_id: string]: ITier }, groups: { [_id: string]: IGroup }, visibleGroups: { [key: number]: boolean }) => {
        if (!Object.keys(players).length || !Object.keys(tiers).length || !Object.keys(groups).length) return [];

        return createGroups(players, tiers, groups, visibleGroups);
    }
);