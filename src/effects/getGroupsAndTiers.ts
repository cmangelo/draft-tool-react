import { push } from 'connected-react-router';
import { normalize, schema } from 'normalizr';

import { loadGroups, loadTiers } from '../actions/entities';
import { logoutUser } from '../actions/user';
import { get } from '../services/superagent';

export const getGroupsAndTiersEffect = () => {
    return async (dispatch: any) => {
        try {
            const response = await get('players/groups');
            const groupsJSON = response.body;
            const groupSchema = new schema.Entity('groups', {}, { idAttribute: '_id' });
            const tierSchema = new schema.Entity('tiers', {}, { idAttribute: '_id' });
            const groups = normalize(groupsJSON.groups, [groupSchema]);
            const tiers = normalize(groupsJSON.tiers, [tierSchema]);
            dispatch(loadGroups(groups.entities.groups as any));
            dispatch(loadTiers(tiers.entities.tiers as any));
        } catch (err) {
            if (err.status === 401) {
                dispatch(logoutUser());
                dispatch(push('/login'));
            }
        }

    }
}