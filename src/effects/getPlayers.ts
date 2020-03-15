import { push } from 'connected-react-router';
import { normalize, schema } from 'normalizr';

import { loadPlayers } from '../actions/entities';
import { get } from '../services/superagent';
import { getDraftEffect } from './getDraft';

export const getPlayersEffect = () => {
    return async (dispatch: any) => {
        try {
            const response = await get('players');
            const playersJSON = response.body;
            const playerSchema = new schema.Entity('players', {}, { idAttribute: '_id' });
            const players = normalize(playersJSON, [playerSchema]);
            dispatch(loadPlayers(players.entities.players as any));
            dispatch(getDraftEffect());
        } catch (err) {
            if (err.status === 401)
                dispatch(push('/login'));
        }
    }
}