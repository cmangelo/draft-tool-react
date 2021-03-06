import { EPosition } from '../models/enums/position.enum';

export const rankingsActionTypes = {
    DRAFT_PLAYER: '[Rankings] Draft Player',
    TOGGLE_POSITION_VISIBLE: '[Rankings] Toggle Position Visible',
    DRAFT_KICKER: '[Toolbar] Draft Kicker',
    DRAFT_DEFENSE: '[Toolbar] Draft Defense'
};

export const draftPlayer = (playerId: string) => ({
    type: rankingsActionTypes.DRAFT_PLAYER,
    payload: {
        playerId
    }
});

export const togglePositionVisible = (position: EPosition, previous?: EPosition) => ({
    type: rankingsActionTypes.TOGGLE_POSITION_VISIBLE,
    payload: {
        position,
        previous
    }
});