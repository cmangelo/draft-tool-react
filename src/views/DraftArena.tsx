import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { setDraftId } from '../actions/draft';
import { Player } from '../components/Player';
import { getGroupsAndTiersEffect } from '../effects/getGroupsAndTiers';
import { getPlayersEffect } from '../effects/getPlayers';
import DraftBoard from './DraftBoard';
import Rankings from './Rankings';

class DraftArena extends React.Component<any, any> {
    componentDidMount() {
        const draftId = this.props.match.params.draftId;
        this.props.setDraftId(draftId);
        this.props.getGroupsAndTiers();
        this.props.getPlayers();
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/drafts/:draftId/rankings/players/:playerId">
                        <Player {...this.props} />
                    </Route>
                    <Route path="/drafts/:draftId/rankings" >
                        <Rankings />
                    </Route>
                    <Route path="/drafts/:draftId/board">
                        <DraftBoard />
                    </Route>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({
    getGroupsAndTiers: () => dispatch(getGroupsAndTiersEffect()),
    getPlayers: () => dispatch(getPlayersEffect()),
    setDraftId: (draftId: string) => dispatch(setDraftId(draftId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftArena);