import { normalize, schema } from 'normalizr';
import React from 'react';

import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { Player } from './Player';

interface TiersState {
    players: { [key: string]: IPlayer };
    tiers: { [key: string]: ITier };
}

export class Tiers extends React.Component<{}, TiersState> {
    constructor(props: any) {
        super(props);
        this.state = {
            players: {},
            groups: {},
            tiers: {}
        };
    }

    async componentDidMount() {
        let response = await fetch('http://localhost:3000/players', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let playersJSON = await response.json();
        const playerSchema = new schema.Entity('players', {}, { idAttribute: '_id' });
        const players = normalize(playersJSON, [playerSchema]);

        let response2 = await fetch('http://localhost:3000/players/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let groupsJSON = await response2.json();
        const groupSchema = new schema.Entity('groups', {}, { idAttribute: '_id' });
        const tierSchema = new schema.Entity('tiers', {}, { idAttribute: '_id' });
        const groups = normalize(groupsJSON.groups, [groupSchema]);
        const tiers = normalize(groupsJSON.tiers, [tierSchema]);

        this.setState(() => {
            return {
                players: players.entities.players,
                groups: groups.entities.groups,
                tiers: tiers.entities.tiers
            }
        });
    }

    createTierArray() {
        const players = Object.keys(this.state.players).map((id: string) => this.state.players[id]);
        return players.map((player: IPlayer) => {
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