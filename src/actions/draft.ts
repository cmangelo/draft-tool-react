export const draftActionTypes = {
    LOAD_DRAFT: '[API] Load Draft',
    LOAD_DRAFTS: '[API] Load Drafts',
    SET_DRAFT_ID: '[Draft Arena] Set Draft ID'
};

export const loadDraft = (draft: any) => ({
    type: draftActionTypes.LOAD_DRAFT,
    payload: draft
});

export const loadDrafts = (drafts: Array<any>) => ({
    type: draftActionTypes.LOAD_DRAFTS,
    payload: drafts
});

export const setDraftId = (draftId: string) => ({
    type: draftActionTypes.SET_DRAFT_ID,
    payload: draftId
})