export const rankingsActionTypes = {
    DRAFT_PLAYER: '[Rankings] Draft Player'
};

export const draftPlayer = (playerId: string) => ({
    type: rankingsActionTypes.DRAFT_PLAYER,
    payload: {
        playerId
    }
});