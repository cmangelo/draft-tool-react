import superagent from 'superagent';

import { loadDraft } from '../actions/draft';
import { IDraft } from '../models/draft.interface';


export const createDraftEffect = (draft: IDraft) => {
    return async (dispatch: any) => {
        const response = await superagent
            .post('http://localhost:3000/drafts')
            .send(draft)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M');

        const draftJSON = response.body;
        dispatch(loadDraft({ draft: draftJSON, picks: [] }))
        return draftJSON._id;
    }
}