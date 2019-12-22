import { normalize, schema } from 'normalizr';
import React from 'react';
import { connect } from 'react-redux';

import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { loadGroups, loadPlayers, loadTiers } from '../redux/actions';
import { Player } from './Player';
import { PlayerGroup } from './PlayerGroup';

interface RankingsState {
    players: { [key: string]: IPlayer };
    groups: { [key: string]: IGroup };
    tiers: { [key: string]: ITier };
}

class Rankings extends React.Component<any, RankingsState> {
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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M'
            }
        });
        let playersJSON = await response.json();
        const playerSchema = new schema.Entity('players', {}, { idAttribute: '_id' });
        const players = normalize(playersJSON, [playerSchema]);
        console.log(players)
        this.props.loadPlayers(players.entities.players);

        let response2 = await fetch('http://localhost:3000/players/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU4ODVmMmQ3NDk3ZDRlNGM3NDY3MWUiLCJpYXQiOjE1NzU4NjA3NDJ9.4f8qdnYxko3cXthkzrOVBH4p7UYp3XyS9nmTyq4lM9M'
            }
        });
        let groupsJSON = await response2.json();
        const groupSchema = new schema.Entity('groups', {}, { idAttribute: '_id' });
        const tierSchema = new schema.Entity('tiers', {}, { idAttribute: '_id' });
        const groups = normalize(groupsJSON.groups, [groupSchema]);
        const tiers = normalize(groupsJSON.tiers, [tierSchema]);

        this.props.loadGroups(groups.entities.groups);
        this.props.loadTiers(tiers.entities.tiers);
    }

    createTierArray() {
        const players = Object.keys(this.state.players).map((id: string) => this.state.players[id]);
        return players.map((player: IPlayer) => {
            return (
                <Player player={player} key={player._id}></Player>
            );
        });
    }

    createGroups() {
        const groups = Object.keys(this.state.groups).map((id: string) => this.state.groups[id]);
        return groups.map((group: IGroup) => {

            return (
                <PlayerGroup group={group} key={group._id}></PlayerGroup>
            );
        });
    }

    render() {
        return (
            <div>
                {this.createGroups()}
            </div>
        );
    }
}

export default connect(
    null,
    { loadPlayers, loadGroups, loadTiers }
)(Rankings);