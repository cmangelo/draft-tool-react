import { push } from 'connected-react-router';

import { deleteRank } from '../actions/user-ranks';
import { del } from '../services/superagent';

export const deleteRanksEffect = (playerId: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(deleteRank(playerId));
            await del(`players/${playerId}/rankings`);
        } catch (err) {
            if (err.status === 401)
                dispatch(push('/login'));
        }
    }
}