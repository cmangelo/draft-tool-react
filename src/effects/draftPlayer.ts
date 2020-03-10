import superagent from 'superagent';

import { draftPlayer } from '../actions/rankings';
import { DraftState } from '../reducers/draft';

export const draftPlayerEffect = (playerId: string) => {
    const token = localStorage.getItem('token');
    return async (dispatch: any, getState: any, endpoint: string) => {
        dispatch(draftPlayer(playerId));
        const draft = getState().draft as DraftState;
        // doing draft.overall - 1 so that we can optimistically update the draft state
        await superagent
            .post(`${endpoint}drafts/${draft.draftId}/picks`)
            .send({ overall: draft.overall - 1, player: playerId, draft: draft.draftId })
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token);

    }
}