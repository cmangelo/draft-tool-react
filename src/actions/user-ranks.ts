import { EPosition } from '../models/enums/position.enum';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { IPlayer } from '../models/player.interface';

export const userRanksActionTypes = {
    TOGGLE_POSITION_VISIBLE: '[User Ranks] Toggle Position Visible',
    RANK_PLAYER: '[User Ranks] Rank Player',
    SELECT_PLAYER: '[User Ranks] Select Player',
    DELETE_RANK: '[User Ranks] Delete Rank',
    GET_PLAYER_DETAIL_SUCCESS: '[User Ranks] Get Player Detail Success'
};

export const rankPlayer = (playerId: string, ranking: UserRanking) => ({
    type: userRanksActionTypes.RANK_PLAYER,
    payload: {
        playerId,
        ranking
    }
});

export const togglePositionVisible = (position: EPosition, previous?: EPosition) => ({
    type: userRanksActionTypes.TOGGLE_POSITION_VISIBLE,
    payload: {
        position,
        previous
    }
});

export const selectPlayer = (playerId: string) => ({
    type: userRanksActionTypes.SELECT_PLAYER,
    payload: {
        playerId
    }
});

export const deleteRank = (playerId: string) => ({
    type: userRanksActionTypes.DELETE_RANK,
    payload: {
        playerId
    }
});

export const getPlayerDetailSuccess = (player: IPlayer) => ({
    type: userRanksActionTypes.GET_PLAYER_DETAIL_SUCCESS,
    payload: {
        player
    }
});