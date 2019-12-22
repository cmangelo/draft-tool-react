import { normalize, schema } from 'normalizr';

import { loadGroups, loadPlayersPending, loadTiers } from '../actions';

export const getGroupsAndTiers = () => {
    return async (dispatch: any) => {
        dispatch(loadPlayersPending());
        let response = await fetch('http://localhost:3000/players/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M'
            }
        });
        let groupsJSON = await response.json();
        const groupSchema = new schema.Entity('groups', {}, { idAttribute: '_id' });
        const tierSchema = new schema.Entity('tiers', {}, { idAttribute: '_id' });
        const groups = normalize(groupsJSON.groups, [groupSchema]);
        const tiers = normalize(groupsJSON.tiers, [tierSchema]);
        dispatch(loadGroups(groups.entities.groups));
        dispatch(loadTiers(tiers.entities.tiers));
    }
}