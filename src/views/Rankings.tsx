import React from 'react';
import { connect } from 'react-redux';

import { draftPlayer } from '../actions/rankings';
import { getGroupsAndTiers } from '../effects/getGroupsAndTiers';
import { getPlayersEffect } from '../effects/getPlayers';
import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { getGroupsWithPlayers } from '../reducers/entities';
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
                <PlayerGroup group={group} draftPlayer={this.props.draftPlayer} key={group._id}></PlayerGroup>
            );
        });
    }

    render() {
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        getGroupsAndTiers: () => dispatch(getGroupsAndTiers()),
        getPlayers: () => dispatch(getPlayersEffect()),
        draftPlayer: (playerId: string) => dispatch(draftPlayer(playerId))
    }
}

export default connect(
    mapStateToProps,
    // { getGroupsAndTiers, getPlayers: getPlayersEffect }
    mapDispatchToProps
)(Rankings);