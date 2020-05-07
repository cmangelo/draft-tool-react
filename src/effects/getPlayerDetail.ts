import { push } from 'connected-react-router';

import { getPlayerDetailSuccess, selectPlayer } from '../actions/user-ranks';
import { EntitiesState } from '../reducers/entities';
import { get } from '../services/superagent';

export const getPlayerDetailEffect = (playerId: string, navigate: boolean) => {
    return async (dispatch: any, getState: any) => {
        try {
            if (!playerId) return;
            dispatch(selectPlayer(playerId));

            if (navigate)
                dispatch(push(`/players/${playerId}`));

            const entities = getState().entities as EntitiesState;

            // if the notes have a value, then we have already retrieved the player detail
            if (entities.players[playerId]?.notes)
                return;

            const response = await get(`players/${playerId}`);
            if (response) {
                dispatch(getPlayerDetailSuccess(response.body));
            }
        } catch (err) {
            if (err.status === 401)
                dispatch(push('/login'));
        }
    }
}