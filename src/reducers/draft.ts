import { draftActionTypes } from '../actions/draft';
import { rankingsActionTypes } from '../actions/rankings';
import { IDraft } from '../models/draft.interface';
import { IPick } from '../models/pick.interface';

export interface DraftState {
    draftId: string;
    draftConfig: IDraft | null;
    overall: number;
    teams: { [overall: number]: any }
    currTeam: number;
    currRound: number;
}

const initialState: DraftState = {
    draftId: '5deda7de6a951c87448a52fb',
    draftConfig: null,
    overall: 1,
    teams: {},
    currTeam: 1,
    currRound: 1
}

export default function (state = initialState, action: { type: string, payload: any }) {
    let numTeams = 0;
    switch (action.type) {
        case rankingsActionTypes.DRAFT_PLAYER:
            const newPick: IPick = { _id: '', draft: state.draftId, overall: state.overall, player: action.payload.playerId };
            const newCurrTeam = getNextTeam(state.currTeam, state.overall, state.draftConfig?.numTeams as number);
            const newOverall = state.overall + 1;
            numTeams = state.draftConfig?.numTeams as number;
            return {
                ...state,
                overall: newOverall,
                currTeam: newCurrTeam,
                currRound: Math.ceil(newOverall / numTeams),
                teams: {
                    ...state.teams,
                    [state.currTeam]: {
                        ...state.teams[state.currTeam],
                        picks: state.teams[state.currTeam].picks.map((pick: IPick, i: number) => i === state.currRound ? newPick : pick)
                    }
                }
            }
        case draftActionTypes.LOAD_DRAFT:
            const draft = action.payload.draft as IDraft;
            numTeams = draft.numTeams;
            const numPicks = draft.numRounds;
            const teams = assignPicksToTeams(action.payload.picks, numTeams, numPicks);
            const overallPick = action.payload.picks.length + 1;
            const round = Math.ceil(overallPick / numTeams);
            const oddRound = round % 2 !== 0;
            let currTeam = 0;
            if (oddRound) {
                if (overallPick % numTeams === 0) {
                    currTeam = numTeams;
                } else {
                    currTeam = overallPick % numTeams;
                }
            } else {
                if (overallPick % numTeams === 0) {
                    currTeam = 1;
                } else {
                    currTeam = numTeams - (overallPick % numTeams) + 1
                }
            }
            return {
                ...state,
                draftConfig: draft,
                overall: overallPick,
                currRound: round,
                currTeam,
                teams
            }
        default:
            return state;
    }
}

const assignPicksToTeams = (picks: Array<IPick>, numTeams: number, numPicks: number) => {
    const teams = {} as any;
    const emptyPicksArray = [];
    for (let i = 0; i < numPicks + 1; i++) {
        emptyPicksArray.push({ _id: '', draft: '', overall: 0, player: '' } as IPick)
    }
    for (let i = 1; i < numTeams + 1; i++) {
        teams[i] = { picks: [...emptyPicksArray], position: i };
    }
    let currTeam = 1;
    // let currRound = 1;
    picks.forEach(pick => {
        const currRound = Math.ceil(pick.overall / numTeams);
        teams[currTeam].picks[currRound] = pick;
        currTeam = getNextTeam(currTeam, pick.overall, numTeams);
    });
    return teams;
}

const getNextTeam = (currTeam: number, overall: number, numTeams: number) => {
    const currRound = Math.ceil(overall / numTeams);
    const oddRound = currRound % 2 !== 0;

    if (oddRound && currTeam !== numTeams) {
        return currTeam + 1;
    } else if (!oddRound && currTeam !== 1) {
        return currTeam - 1;
    }
    return currTeam;
}

export const getDraft = (state: any) => state.draft;
export const getDraftConfig = (state: any) => state.draft.draftConfig;
export const getTeams = (state: any) => Object.keys(state.draft.teams)
    .map(key => {
        const team = state.draft.teams[key];
        team.picks.map((pick: IPick) => {
            pick.playerObject = state.entities.players[pick.player];
            return pick;
        });
        return team;
    })
    .sort((a, b) => a.position - b.position);