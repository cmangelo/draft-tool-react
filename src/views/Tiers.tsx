import { normalize, schema } from 'normalizr';
import React from 'react';

import { IPlayer } from '../models/player.interface';
import { Player } from './Player';

export class Tiers extends React.Component<{}, { players: Array<IPlayer> }> {
    constructor(props: any) {
        super(props);
        this.state = {
            players: [],
        };
    }

    async componentDidMount() {
        let response = await fetch('http://localhost:3000/players', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let players = await response.json();
        const playerSchema = new schema.Entity('players', {}, { idAttribute: '_id' });
        const normPlayers = normalize(players, [playerSchema]);
        console.log(normPlayers);

        let response2 = await fetch('http://localhost:3000/players/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let groups = await response2.json();
        this.setState(() => {
            return {
                players
            }
        });
    }

    createTierArray() {
        return this.state.players.map((player: IPlayer) => {
            return (
                <Player player={player} key={player._id}></Player>
            );
        });
    }

    render() {
        return (
            <div>
                {this.createTierArray()}
            </div>
        )
    }
}