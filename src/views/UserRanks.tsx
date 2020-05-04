import React from 'react';
import { connect } from 'react-redux';

import { selectPlayer, togglePositionVisible } from '../actions/user-ranks';
import { GroupSelector } from '../components/GroupSelector';
import { PlayerGroup } from '../components/PlayerGroup';
import { rankPlayerEffect } from '../effects/rankPlayer';
import { EPosition } from '../models/enums/position.enum';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { IGroup } from '../models/group.interface';
import { getSelectedPlayer, getVisibleGroups } from '../reducers/user-ranks';
import { getGroupsWithPlayers } from '../selectors/user-ranks';

class UserRanks extends React.Component<any, any> {
    renderGroup() {
        if (!this.props.groupsWithPlayers) return;
        return this.props.groupsWithPlayers.map((group: IGroup) => {
            return (
                <PlayerGroup group={group} selectPlayer={this.props.selectPlayer} selectedPlayer={this.props.selectedPlayer} key={group._id}></PlayerGroup>
            );
        });
    }

    render() {
        return (
            <div className="UserRanks">
                <div className="ranks">
                    <GroupSelector visibleGroups={this.props.visibleGroups} togglePositionVisible={this.props.togglePositionVisible}></GroupSelector>
                    {this.renderGroup()}
                </div>
                <div className="player-card"></div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    groupsWithPlayers: getGroupsWithPlayers(state),
    visibleGroups: getVisibleGroups(state),
    selectedPlayer: getSelectedPlayer(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    selectPlayer: (playerId: string) => dispatch(selectPlayer(playerId)),
    rankPlayer: (playerId: string, ranking: UserRanking) => dispatch(rankPlayerEffect(playerId, ranking)),
    togglePositionVisible: (position: EPosition) => dispatch(togglePositionVisible(position)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRanks);