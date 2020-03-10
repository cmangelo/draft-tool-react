import superagent from 'superagent';

import { loadDrafts } from '../actions/draft';

export const getPreviousDraftsEffect = () => {
    const token = localStorage.getItem('token');
    return async (dispatch: any, _: any, endpoint: string) => {
        const response = await superagent
            .get(endpoint + 'drafts')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token);

        const draftJSON = response.body;
        dispatch(loadDrafts(draftJSON))
    }
}