import { userRanksActionTypes } from '../actions/user-ranks';
import { EPosition } from '../models/enums/position.enum';

const initialVisibleGroups = {
    [EPosition.QB]: false,
    [EPosition.RB]: false,
    [EPosition.WR]: false,
    [EPosition.TE]: false,
    [EPosition.FLEX]: false
}

export interface UserRanksState {
    visibleGroups: { [key: number]: boolean },
    selectedPlayer: string;
}

const initialState: UserRanksState = {
    visibleGroups: { ...initialVisibleGroups, [EPosition.QB]: true },
    selectedPlayer: ''
}

export default function (state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case userRanksActionTypes.TOGGLE_POSITION_VISIBLE:
            return {
                ...state,
                visibleGroups: {
                    ...initialVisibleGroups,
                    [action.payload.position]: true
                }
            }
        case userRanksActionTypes.SELECT_PLAYER:
            return {
                ...state,
                selectedPlayer: action.payload.playerId
            }
        default:
            return state
    }
}

export const getVisibleGroups = (state: any) => state.userRanks.visibleGroups;
export const getSelectedPlayer = (state: any) => state.userRanks.selectedPlayer;