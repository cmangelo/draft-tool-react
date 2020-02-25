import superagent from 'superagent';

import { loadDrafts } from '../actions/draft';

export const getPreviousDraftsEffect = () => {
    return async (dispatch: any) => {
        const response = await superagent
            .get('http://localhost:3000/drafts')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M');

        const draftJSON = response.body;
        dispatch(loadDrafts(draftJSON))
    }
}