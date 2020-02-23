import superagent from 'superagent';

import { loadDraft } from '../actions/draft';
import { DraftState } from '../reducers/draft';

export const getDraftEffect = () => {
    return async (dispatch: any, getState: any) => {
        const draft = getState().draft as DraftState;
        const response = await superagent
            .get('http://localhost:3000/drafts/' + draft.draftId)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M');

        const draftJSON = response.body;
        dispatch(loadDraft(draftJSON))
    }
}