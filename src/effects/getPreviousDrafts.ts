import { push } from 'connected-react-router';

import { loadDrafts } from '../actions/draft';
import { get } from '../services/superagent';

export const getPreviousDraftsEffect = () => {
    return async (dispatch: any) => {
        try {
            const response = await get('drafts');
            const draftJSON = response.body;
            dispatch(loadDrafts(draftJSON))
        } catch (err) {
            if (err.status === 401)
                dispatch(push('/login'));
        }
    }
}