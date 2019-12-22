import React from 'react';
import { connect } from 'react-redux';

import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { getGroupsAndTiers } from '../redux/effects/getGroupsAndTiers';
import { getPlayersEffect } from '../redux/effects/getPlayers';
import { getGroups, getPlayers, getTiers } from '../redux/reducers/entities';
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

    }

    async componentDidMount() {
        this.props.getPlayers();
        this.props.getGroupsAndTiers();
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
        if (!this.props.tiers) return;
        const groups = Object.keys(this.props.groups).map((id: string) => this.props.groups[id]);
        // console.log(groups);
        return groups.map((group: IGroup) => {

            return (
                <PlayerGroup group={group} key={group._id}></PlayerGroup>
            );
        });
    }

    render() {
        const { players, groups, tiers } = this.props;
        return (
            <div>
                {this.createGroups()}
                {/* {players} */}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    players: getPlayers(state),
    tiers: getTiers(state),
    groups: getGroups(state)
});

export default connect(
    mapStateToProps,
    { getGroupsAndTiers, getPlayers: getPlayersEffect }
)(Rankings);