import React from 'react';
import { connect } from 'react-redux';

import { togglePositionVisible } from '../actions/user-ranks';
import { GroupSelector } from '../components/GroupSelector';
import { Player } from '../components/Player';
import { PlayerGroup } from '../components/PlayerGroup';
import { deleteRanksEffect } from '../effects/deleteRank';
import { getGroupsAndTiersEffect } from '../effects/getGroupsAndTiers';
import { getPlayerDetailEffect } from '../effects/getPlayerDetail';
import { getPlayersEffect } from '../effects/getPlayers';
import { rankPlayerEffect } from '../effects/rankPlayer';
import { EPosition } from '../models/enums/position.enum';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { IGroup } from '../models/group.interface';
import { getSelectedPlayer, getVisibleGroups } from '../reducers/user-ranks';
import { getGroupsWithPlayers } from '../selectors/user-ranks';

class UserRanks extends React.Component<any, any> {
    componentDidMount() {
        this.props.getGroupsAndTiers();
        this.props.getPlayers();
    }

    renderGroup() {
        if (!this.props.groupsWithPlayers) return;
        return this.props.groupsWithPlayers.map((group: IGroup) => {
            return (
                <PlayerGroup
                    group={group}
                    rankPlayer={this.props.rankPlayer}
                    deleteRank={this.props.deleteRank}
                    selectPlayer={this.props.selectPlayer}
                    selectedPlayer={this.props.selectedPlayer}
                    key={group._id}>
                </PlayerGroup>
            );
        });
    }

    render() {
        if (!this.props.selectedPlayer)
            this.props.selectPlayer(this.props.groupsWithPlayers[0]?.tiers[0]?.players[0]._id);
        return (
            <div className="UserRanks">
                <div className="ranks">
                    <GroupSelector visibleGroups={this.props.visibleGroups} togglePositionVisible={this.props.togglePositionVisible}></GroupSelector>
                    {this.renderGroup()}
                </div>
                <div className="player-card">
                    <Player player={this.props.selectedPlayer}></Player>
                </div>
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
    getGroupsAndTiers: () => dispatch(getGroupsAndTiersEffect()),
    getPlayers: () => dispatch(getPlayersEffect()),
    selectPlayer: (playerId: string) => dispatch(getPlayerDetailEffect(playerId)),
    rankPlayer: (playerId: string, ranking: UserRanking) => dispatch(rankPlayerEffect(playerId, ranking)),
    deleteRank: (playerId: string) => dispatch(deleteRanksEffect(playerId)),
    togglePositionVisible: (position: EPosition) => dispatch(togglePositionVisible(position)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRanks);