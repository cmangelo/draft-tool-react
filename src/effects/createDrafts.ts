import superagent from 'superagent';

import { loadDraft } from '../actions/draft';
import { IDraft } from '../models/draft.interface';


export const createDraftEffect = (draft: IDraft) => {
    const token = localStorage.getItem('token');
    return async (dispatch: any, _: any, endpoint: string) => {
        const response = await superagent
            .post(endpoint + 'drafts')
            .send(draft)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token);

        const draftJSON = response.body;
        dispatch(loadDraft({ draft: draftJSON, picks: [] }))
        return draftJSON._id;
    }
}