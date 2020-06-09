import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import { getPreviousDraftsEffect } from '../effects/getPreviousDrafts';
import { IDraft } from '../models/draft.interface';
import { getPreviousDrafts } from '../reducers/draft';

class DraftsList extends React.Component<any, any> {
    componentDidMount() {
        this.props.getPreviousDrafts();
    }

    createDraft() {
        this.props.history.push('/drafts/create');
    }

    goToDraft(draftId: string) {
        this.props.history.push(`/drafts/${draftId}/rankings`);
    }

    renderDraftsList() {
        if (!this.props.drafts) return;
        return this.props.drafts.map((draft: IDraft) => {
            return (
                <div key={draft._id} className="draft-list-item" onClick={() => this.goToDraft(draft._id as string)}>
                    <div className="left">
                        <span>{draft.numTeams} Team Draft</span>
                        <span className="draft-position">Draft Position - {draft.userPosition}</span>
                    </div>
                    <div className="right">
                        <span className="date">{moment(draft.createdAt).format('M/D/YY')}</span>
                        <span className="time">{moment(draft.createdAt).format('h:mma')}</span>
                    </div>
                    <span></span>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="DraftsList">
                <div>
                    <h1>My Drafts</h1>
                    <div className="list">
                        {this.props.drafts && this.props.drafts.length
                            ? this.renderDraftsList()
                            : (
                                <div className="no-drafts">
                                    <p>You haven't started any drafts.</p>
                                    <button onClick={this.createDraft.bind(this)}>Create a Draft</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    drafts: getPreviousDrafts(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getPreviousDrafts: () => dispatch(getPreviousDraftsEffect()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftsList);