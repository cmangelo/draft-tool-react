import { normalize, schema } from 'normalizr';
import superagent from 'superagent';

import { loadGroups, loadPlayersPending, loadTiers } from '../actions/entities';

export const getGroupsAndTiersEffect = () => {
    const token = localStorage.getItem('token');
    return async (dispatch: any, _: any, endpoint: string) => {
        dispatch(loadPlayersPending());
        const response = await superagent
            .get(endpoint + 'players/groups')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
        const groupsJSON = response.body;
        const groupSchema = new schema.Entity('groups', {}, { idAttribute: '_id' });
        const tierSchema = new schema.Entity('tiers', {}, { idAttribute: '_id' });
        const groups = normalize(groupsJSON.groups, [groupSchema]);
        const tiers = normalize(groupsJSON.tiers, [tierSchema]);
        dispatch(loadGroups(groups.entities.groups as any));
        dispatch(loadTiers(tiers.entities.tiers as any));
    }
}