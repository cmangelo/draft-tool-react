import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { togglePositionVisible } from '../actions/rankings';
import { GroupSelector } from '../components/GroupSelector';
import { Player } from '../components/Player';
import { PlayerGroup } from '../components/PlayerGroup';
import { draftPlayerEffect } from '../effects/draftPlayer';
import { getPlayerDetailEffect } from '../effects/getPlayerDetail';
import { EPosition } from '../models/enums/position.enum';
import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { getVisibleGroups } from '../reducers/rankings';
import { getGroupsWithPlayers } from '../selectors/rankings';
import { screenSizes } from '../services/window';

// import { selectPlayer } from '../actions/user-ranks';

interface RankingsState {
    players: { [key: string]: IPlayer };
    groups: { [key: string]: IGroup };
    tiers: { [key: string]: ITier };
    isModalOpen: boolean;
}

class Rankings extends React.Component<any, RankingsState> {
    isModalOpen: boolean = false;
    styles = {
        overlay: { zIndex: 1000 }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            groups: {},
            players: {},
            tiers: {},
            isModalOpen: false
        };
    }

    playerSelected(playerId: string) {
        this.props.selectPlayer(playerId);
        this.setState((state) => ({ ...state, isModalOpen: true }));
    }

    closeModal() {
        this.setState((state) => ({ ...state, isModalOpen: false }));
    }

    renderGroups() {
        if (!this.props.groupsWithPlayers) return;
        return this.props.groupsWithPlayers.map((group: IGroup) => {
            return (
                <PlayerGroup group={group} draftPlayer={this.props.draftPlayer} key={group._id} selectPlayer={(playerId: string) => this.playerSelected(playerId)}></PlayerGroup>
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
                <Modal isOpen={this.state.isModalOpen} style={this.styles} onRequestClose={this.closeModal.bind(this)}>
                    <FontAwesomeIcon icon="times" onClick={this.closeModal.bind(this)} size="lg"></FontAwesomeIcon>
                    <Player></Player>
                </Modal>
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
    selectPlayer: (playerId: string) => dispatch(getPlayerDetailEffect(playerId, false))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rankings);