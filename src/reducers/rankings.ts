import { rankingsActionTypes } from '../actions/rankings';
import { EPosition } from '../models/enums/player.enum';

interface State {
    visibleGroups: { [key: number]: boolean }
}

const initialVisibleGroups = {
    [EPosition.QB]: true,
    [EPosition.RB]: true,
    [EPosition.WR]: true,
    [EPosition.TE]: true,
    [EPosition.FLEX]: false
}

const initialVisibleGroupsSmallScreen = {
    [EPosition.QB]: true,
    [EPosition.RB]: false,
    [EPosition.WR]: false,
    [EPosition.TE]: false,
    [EPosition.FLEX]: false
}

const initialState: State = {
    visibleGroups: window.screen.width < 650
        ? initialVisibleGroupsSmallScreen
        : initialVisibleGroups

}

export default function (state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case rankingsActionTypes.TOGGLE_POSITION_VISIBLE:
            const isSmallScreen = window.screen.width < 750;
            return isSmallScreen ?
                {
                    ...state,
                    visibleGroups: {
                        [EPosition.QB]: false,
                        [EPosition.RB]: false,
                        [EPosition.WR]: false,
                        [EPosition.TE]: false,
                        [EPosition.FLEX]: false,
                        [action.payload.position]: true
                    }
                } :
                {
                    ...state,
                    visibleGroups: {
                        ...state.visibleGroups,
                        [action.payload.position]: !state.visibleGroups[action.payload.position]
                    }
                }
        default:
            return state;
    }
};

export const getVisibleGroups = (state: any) => state.rankings.visibleGroups