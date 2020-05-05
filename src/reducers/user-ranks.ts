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

export const getSelectedPlayer = (state: any) => state.entities.players[state.userRanks.selectedPlayer];//{
// get
// if (!state || !state.userRanks.visibleGroups) return;
// if (state.userRanks.selectedPlayer && state.entities.players)
//     return state.entities.players[state.userRanks.selectedPlayer];
// return getGroupsWithPlayers(state)[0];
// const visiblePosition = Object.keys(state.userRanks.visibleGroups).find(group => state.userRanks.visibleGroups[group]) as unknown as number;
// console.log(visiblePosition)
// return state.entities.players.find((player: IPlayer) => player.position === visiblePosition && player.)
// }

// export const getSelectedPlayer2 = createSelector(
//     [getSelectedPlayer, getPlayers, getGroupsWithPlayers],
//     (playerId, players, groups) => {
//         if (!!playerId)
//             return players[playerId];
//         return groups[0];
//     }
// )