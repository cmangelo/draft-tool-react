import React from 'react';
import { connect } from 'react-redux';

import { DraftPickCard } from '../components/DraftPickCard';
import { getGroupsAndTiers } from '../effects/getGroupsAndTiers';
import { getPlayersEffect } from '../effects/getPlayers';
import { IDraft } from '../models/draft.interface';
import { IPick } from '../models/pick.interface';
import { getDraftConfig, getTeams } from '../reducers/draft';

class DraftBoard extends React.Component<any, any> {
    componentDidMount() {
        this.props.getPlayers();
        this.props.getGroupsAndTiers();
    }

    renderRows() {
        if (!this.props.teams || !this.props.draftConfig) return;
        const config = this.props.draftConfig as IDraft;
        return this.props.teams.map((team: any) => {
            return (
                <div className="team-column" key={team.position}>
                    {this.renderColumn(team)}
                </div>
            );
        });
    }

    renderColumn(team: any) {
        return team.picks.map((pick: IPick, ind: number) => {
            if (ind === 0) return;
            return (
                <DraftPickCard pick={pick} key={ind} round={ind}></DraftPickCard>
            );
        });
    }

    render() {
        return (
            <div className="DraftBoard">
                {this.renderRows()}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    teams: getTeams(state),
    draftConfig: getDraftConfig(state)
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        getGroupsAndTiers: () => dispatch(getGroupsAndTiers()),
        getPlayers: () => dispatch(getPlayersEffect()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftBoard);