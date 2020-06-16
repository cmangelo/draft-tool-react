import { push } from 'connected-react-router';
import { normalize, schema } from 'normalizr';

import { loadPlayers, loadSpecialPlayers } from '../actions/entities';
import { EPosition } from '../models/enums/position.enum';
import { IPlayer } from '../models/player.interface';
import { get } from '../services/superagent';
import { getDraftEffect } from './getDraft';

export const getPlayersEffect = () => {
    return async (dispatch: any) => {
        try {
            const response = await get('players');
            const playersJSON = response.body;
            const kickerId = playersJSON.find((player: IPlayer) => player.position === EPosition.K)._id;
            const defenseId = playersJSON.find((player: IPlayer) => player.position === EPosition.DST)._id;
            const playerSchema = new schema.Entity('players', {}, { idAttribute: '_id' });
            const players = normalize(playersJSON, [playerSchema]);
            dispatch(loadSpecialPlayers(defenseId, kickerId));
            dispatch(loadPlayers(players.entities.players as any));
            dispatch(getDraftEffect());
        } catch (err) {
            if (err.status === 401)
                dispatch(push('/login'));
        }
    }
}