import { push } from 'connected-react-router';

import { loadDrafts } from '../actions/draft';
import { logoutUser } from '../actions/user';
import { get } from '../services/superagent';

export const getPreviousDraftsEffect = () => {
    return async (dispatch: any) => {
        try {
            const response = await get('drafts?page=1');
            const draftJSON = response.body;
            dispatch(loadDrafts(draftJSON))
        } catch (err) {
            if (err.status === 401) {
                dispatch(logoutUser());
                dispatch(push('/login'));
            }
        }
    }
}