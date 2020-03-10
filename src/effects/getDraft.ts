import superagent from 'superagent';

import { loadDraft } from '../actions/draft';
import { DraftState } from '../reducers/draft';

export const getDraftEffect = () => {
    const token = localStorage.getItem('token');
    return async (dispatch: any, getState: any, endpoint: string) => {
        const draft = getState().draft as DraftState;
        const response = await superagent
            .get(endpoint + 'drafts/' + draft.draftId)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token);

        const draftJSON = response.body;
        dispatch(loadDraft(draftJSON))
    }
}