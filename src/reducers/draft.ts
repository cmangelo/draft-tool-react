import { rankingsActionTypes } from '../actions/rankings';

export interface DraftState {
    draftId: string;
    overall: number;
}

const initialState: DraftState = {
    draftId: '5deda7de6a951c87448a52fb',
    overall: 1
}

export default function (state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case rankingsActionTypes.DRAFT_PLAYER:
            return {
                ...state,
                overall: state.overall + 1
            }
        default:
            return state;
    }
}

export const getDraft = (state: any) => state.draft;