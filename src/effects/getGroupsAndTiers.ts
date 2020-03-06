import { normalize, schema } from "normalizr";
import superagent from "superagent";

import { loadGroups, loadPlayersPending, loadTiers } from "../actions/entities";

export const getGroupsAndTiersEffect = () => {
    return async (dispatch: any) => {
        dispatch(loadPlayersPending());
        const response = await superagent
            .get('http://localhost:3000/players/groups')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M')
        const groupsJSON = response.body;
        const groupSchema = new schema.Entity('groups', {}, { idAttribute: '_id' });
        const tierSchema = new schema.Entity('tiers', {}, { idAttribute: '_id' });
        const groups = normalize(groupsJSON.groups, [groupSchema]);
        const tiers = normalize(groupsJSON.tiers, [tierSchema]);
        dispatch(loadGroups(groups.entities.groups as any));
        dispatch(loadTiers(tiers.entities.tiers as any));
    }
}