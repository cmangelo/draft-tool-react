import { push } from 'connected-react-router';

import { loadDraft } from '../actions/draft';
import { DraftState } from '../reducers/draft';
import { get } from '../services/superagent';

export const getDraftEffect = () => {
    return async (dispatch: any, getState: any) => {
        try {
            const draft = getState().draft as DraftState;
            const response = await get('drafts/' + draft.draftId);
            const draftJSON = response.body;
            dispatch(loadDraft(draftJSON));
        } catch (err) {
            if (err.status === 401)
                dispatch(push('/login'));
        }
    }
}