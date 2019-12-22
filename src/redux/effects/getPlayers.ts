import { normalize, schema } from 'normalizr';

import { loadPlayers, loadPlayersPending } from '../actions';

export const getPlayersEffect = () => {
    return async (dispatch: any) => {
        dispatch(loadPlayersPending());
        let response = await fetch('http://localhost:3000/players', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M'
            }
        });
        let playersJSON = await response.json();
        const playerSchema = new schema.Entity('players', {}, { idAttribute: '_id' });
        const players = normalize(playersJSON, [playerSchema]);
        dispatch(loadPlayers(players.entities.players))
    }
}