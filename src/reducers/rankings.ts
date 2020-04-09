import { rankingsActionTypes } from '../actions/rankings';
import { uiActionTypes } from '../actions/ui';
import { EPosition } from '../models/enums/position.enum';
import { screenSizes } from '../services/window';

interface State {
    visibleGroups: { [key: number]: boolean },
    numVisibleGroups: number,
    groupSelectionStack: Array<EPosition>
}

const initialVisibleGroupsXL = {
    [EPosition.QB]: true,
    [EPosition.RB]: true,
    [EPosition.WR]: true,
    [EPosition.TE]: true,
    [EPosition.FLEX]: true
}
const stackXL = [EPosition.QB, EPosition.RB, EPosition.WR, EPosition.TE, EPosition.FLEX];

const initialVisibleGroupsL = {
    [EPosition.QB]: true,
    [EPosition.RB]: true,
    [EPosition.WR]: true,
    [EPosition.TE]: true,
    [EPosition.FLEX]: false
}
const stackL = [EPosition.QB, EPosition.RB, EPosition.WR, EPosition.TE];

const initialVisibleGroupsSmallS = {
    [EPosition.QB]: true,
    [EPosition.RB]: true,
    [EPosition.WR]: false,
    [EPosition.TE]: false,
    [EPosition.FLEX]: false
}
const stackS = [EPosition.QB, EPosition.RB];

const initialVisibleGroupsSmallXS = {
    [EPosition.QB]: true,
    [EPosition.RB]: false,
    [EPosition.WR]: false,
    [EPosition.TE]: false,
    [EPosition.FLEX]: false
}
const stackXS = [EPosition.QB];

const declareVisibleGroups = (screenWidth: number) => {
    if (screenWidth >= screenSizes.XL)
        return initialVisibleGroupsXL;

    if (screenWidth >= screenSizes.L)
        return initialVisibleGroupsL;

    if (screenWidth >= screenSizes.S)
        return initialVisibleGroupsSmallS;

    return initialVisibleGroupsSmallXS;
}

const declareStack = (screenWidth: number) => {
    if (screenWidth >= screenSizes.XL)
        return stackXL;

    if (screenWidth >= screenSizes.L)
        return stackL;

    if (screenWidth >= screenSizes.S)
        return stackS;

    return stackXS;
}

const visibleGroups = declareVisibleGroups(window.innerWidth) as { [key: number]: boolean };
const numVisibleGroups = Object.keys(visibleGroups).map(key => visibleGroups[parseInt(key)]).filter(x => x).length;

const initialState: State = {
    visibleGroups,
    numVisibleGroups,
    groupSelectionStack: declareStack(window.innerWidth)
}

export default function (state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case rankingsActionTypes.TOGGLE_POSITION_VISIBLE:
            const stackCopy = [...state.groupSelectionStack];
            const lastGroupMarked = stackCopy.shift() as EPosition;
            stackCopy.push(action.payload.position);
            return {
                ...state,
                visibleGroups: {
                    ...state.visibleGroups,
                    [lastGroupMarked]: false,
                    [action.payload.position]: true
                },
                groupSelectionStack: stackCopy
            }
        case uiActionTypes.SCREEN_RESIZE:
            const visibleGroups = declareVisibleGroups(action.payload.screenWidth) as { [key: number]: boolean };
            return {
                visibleGroups,
                groupSelectionStack: declareStack(action.payload.screenWidth),
                numVisibleGroups: Object.keys(visibleGroups).map(key => visibleGroups[parseInt(key)]).filter(x => x).length
            }
        default:
            return state;
    }
};

export const getVisibleGroups = (state: any) => state.rankings.visibleGroups;