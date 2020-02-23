export const draftActionTypes = {
    LOAD_DRAFT: '[API] Load Draft'
};

export const loadDraft = (draft: any) => ({
    type: draftActionTypes.LOAD_DRAFT,
    payload: draft
});
