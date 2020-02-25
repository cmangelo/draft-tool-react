export const draftActionTypes = {
    LOAD_DRAFT: '[API] Load Draft',
    LOAD_DRAFTS: '[API] Load Drafts'
};

export const loadDraft = (draft: any) => ({
    type: draftActionTypes.LOAD_DRAFT,
    payload: draft
});

export const loadDrafts = (drafts: Array<any>) => ({
    type: draftActionTypes.LOAD_DRAFTS,
    payload: drafts
});