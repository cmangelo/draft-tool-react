import { normalize, schema } from "normalizr";
import superagent from "superagent";

import { loadPlayers } from "../actions/entities";
import { getDraftEffect } from "./getDraft";

export const getPlayersEffect = () => {
    return async (dispatch: any) => {
        let response = await superagent
            .get('http://localhost:3000/players')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M');
        let playersJSON = response.body;
        const playerSchema = new schema.Entity('players', {}, { idAttribute: '_id' });
        const players = normalize(playersJSON, [playerSchema]);
        dispatch(loadPlayers(players.entities.players as any));
        dispatch(getDraftEffect());
    }
}