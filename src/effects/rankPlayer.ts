import { push } from 'connected-react-router';

import { logoutUser } from '../actions/user';
import { rankPlayer } from '../actions/user-ranks';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { put } from '../services/superagent';

export const rankPlayerEffect = (playerId: string, ranking: UserRanking) => {
    return async (dispatch: any) => {
        try {
            dispatch(rankPlayer(playerId, ranking));
            await put(`players/${playerId}/rankings?rank=${ranking}`);
        } catch (err) {
            if (err.status === 401) {
                dispatch(logoutUser());
                dispatch(push('/login'));
            }
        }
    }
}