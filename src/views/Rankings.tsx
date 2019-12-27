import React from 'react';
import { connect } from 'react-redux';

import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { getGroupsAndTiers } from '../redux/effects/getGroupsAndTiers';
import { getPlayersEffect } from '../redux/effects/getPlayers';
import { getGroupsWithPlayers } from '../redux/reducers/entities';
import { PlayerGroup } from './PlayerGroup';

interface RankingsState {
    players: { [key: string]: IPlayer };
    groups: { [key: string]: IGroup };
    tiers: { [key: string]: ITier };
}

class Rankings extends React.Component<any, RankingsState> {

    componentDidMount() {
        this.props.getPlayers();
        this.props.getGroupsAndTiers();
    }

    createGroups() {
        if (!this.props.groupsWithPlayers) return;
        return this.props.groupsWithPlayers.map((group: IGroup) => {
            return (
                <PlayerGroup group={group} key={group._id}></PlayerGroup>
            );
        });
    }

    render() {
        const { groupsWithPlayers } = this.props;
        console.log(groupsWithPlayers);
        return (
            <div className="Rankings">
                {this.createGroups()}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    groupsWithPlayers: getGroupsWithPlayers(state)
});

export default connect(
    mapStateToProps,
    { getGroupsAndTiers, getPlayers: getPlayersEffect }
)(Rankings);