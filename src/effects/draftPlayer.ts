import { push } from 'connected-react-router';

import { draftPlayer } from '../actions/rankings';
import { DraftState } from '../reducers/draft';
import { post } from '../services/superagent';

export const draftPlayerEffect = (playerId: string) => {
    return async (dispatch: any, getState: any) => {
        try {
            dispatch(draftPlayer(playerId));
            const draft = getState().draft as DraftState;
            const endpoint = `drafts/${draft.draftId}/picks`;
            const data = { overall: draft.overall - 1, player: playerId, draft: draft.draftId };
            await post(endpoint, data);
        } catch (err) {
            if (err.status === 401)
                dispatch(push('/login'));
        }
    }
}