import superagent from 'superagent';

import { draftPlayer } from '../actions/rankings';
import { DraftState } from '../reducers/draft';

export const draftPlayerEffect = (playerId: string) => {
    return async (dispatch: any, getState: any) => {
        dispatch(draftPlayer(playerId));
        const draft = getState().draft as DraftState;
        // doing draft.overall - 1 so that we can optimistically update the draft state
        await superagent
            .post(`http://localhost:3000/drafts/${draft.draftId}/picks`)
            .send({ overall: draft.overall - 1, player: playerId, draft: draft.draftId })
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M');

    }
}