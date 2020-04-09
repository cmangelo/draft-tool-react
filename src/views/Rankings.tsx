import React from 'react';
import { connect } from 'react-redux';

import { togglePositionVisible } from '../actions/rankings';
import { GroupSelector } from '../components/GroupSelector';
import { PlayerGroup } from '../components/PlayerGroup';
import { draftPlayerEffect } from '../effects/draftPlayer';
import { EPosition } from '../models/enums/position.enum';
import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { getVisibleGroups } from '../reducers/rankings';
import { getGroupsWithPlayers } from '../selectors/rankings';
import { screenSizes } from '../services/window';


interface RankingsState {
    players: { [key: string]: IPlayer };
    groups: { [key: string]: IGroup };
    tiers: { [key: string]: ITier };
}

class Rankings extends React.Component<any, RankingsState> {

    renderGroups() {
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
                {
                    window.innerWidth < screenSizes.XL &&
                    <GroupSelector visibleGroups={this.props.visibleGroups} togglePositionVisible={this.props.togglePositionVisible}></GroupSelector>
                }
                <div className="groups">
                    {this.renderGroups()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    groupsWithPlayers: getGroupsWithPlayers(state),
    visibleGroups: getVisibleGroups(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    draftPlayer: (playerId: string) => dispatch(draftPlayerEffect(playerId)),
    togglePositionVisible: (position: EPosition) => dispatch(togglePositionVisible(position)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rankings);