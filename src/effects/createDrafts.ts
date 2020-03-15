import { push } from 'connected-react-router';

import { loadDraft } from '../actions/draft';
import { IDraft } from '../models/draft.interface';
import { post } from '../services/superagent';


export const createDraftEffect = (draft: IDraft) => {
    return async (dispatch: any, _: any, endpoint: string) => {
        try {
            const response = await post('drafts', draft);
            const draftJSON = response.body;
            dispatch(loadDraft({ draft: draftJSON, picks: [] }))
            return draftJSON._id;
        } catch (err) {
            if (err.status === 401)
                dispatch(push('/login'));
        }
    }
}