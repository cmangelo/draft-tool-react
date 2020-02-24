import React from 'react';
import { connect } from 'react-redux';

import { togglePositionVisible } from '../actions/rankings';
import { draftPlayerEffect } from '../effects/draftPlayer';
import { getGroupsAndTiers } from '../effects/getGroupsAndTiers';
import { getPlayersEffect } from '../effects/getPlayers';
import { EPosition } from '../models/enums/position.enum';
import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { getVisibleGroups } from '../reducers/rankings';
import { getGroupsWithPlayers } from '../selectors/rankings';
import { GroupSelector } from './GroupSelector';
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
                <GroupSelector visibleGroups={this.props.visibleGroups} togglePositionVisible={this.props.togglePositionVisible}></GroupSelector>
                <div className="groups">
                    {this.createGroups()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    groupsWithPlayers: getGroupsWithPlayers(state),
    visibleGroups: getVisibleGroups(state)
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        getGroupsAndTiers: () => dispatch(getGroupsAndTiers()),
        getPlayers: () => dispatch(getPlayersEffect()),
        draftPlayer: (playerId: string) => dispatch(draftPlayerEffect(playerId)),
        togglePositionVisible: (position: EPosition) => dispatch(togglePositionVisible(position))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rankings);