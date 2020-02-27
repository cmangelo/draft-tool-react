import React from 'react';
import { connect } from 'react-redux';

import { DraftPickCard } from '../components/DraftPickCard';
import { getGroupsAndTiers } from '../effects/getGroupsAndTiers';
import { getPlayersEffect } from '../effects/getPlayers';
import { IPick } from '../models/pick.interface';
import { getTeams } from '../reducers/draft';

class DraftBoard extends React.Component<any, any> {
    componentDidMount() {
        this.props.getPlayers();
        this.props.getGroupsAndTiers();
    }

    renderRows() {
        if (!this.props.teams) return;
        return this.props.teams.map((team: any) => {
            return (
                <div className="team-column" key={team.position}>
                    {this.renderColumn(team, this.props.teams.length)}
                </div>
            );
        });
    }

    renderColumn(team: any, numTeams: number) {
        return team.picks.map((pick: IPick, ind: number) => {
            if (ind === 0) return (<div key={ind}></div>);
            const roundPick = ind % 2 !== 0
                ? team.position
                : Math.abs(team.position - (numTeams + 1));
            return (
                <DraftPickCard pick={pick} key={ind} round={ind} roundPick={roundPick}></DraftPickCard>
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
    teams: getTeams(state)
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