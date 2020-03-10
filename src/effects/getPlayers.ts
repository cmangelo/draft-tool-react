import { normalize, schema } from 'normalizr';
import superagent from 'superagent';

import { loadPlayers } from '../actions/entities';
import { getDraftEffect } from './getDraft';

export const getPlayersEffect = () => {
    const token = localStorage.getItem('token');
    return async (dispatch: any, _: any, endpoint: string) => {
        let response = await superagent
            .get(endpoint + 'players')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token);
        let playersJSON = response.body;
        const playerSchema = new schema.Entity('players', {}, { idAttribute: '_id' });
        const players = normalize(playersJSON, [playerSchema]);
        dispatch(loadPlayers(players.entities.players as any));
        dispatch(getDraftEffect());
    }
}