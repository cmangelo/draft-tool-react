import React from 'react';
import { connect } from 'react-redux';

import { createDraftEffect } from '../effects/createDrafts';
import { getPreviousDraftsEffect } from '../effects/getPreviousDrafts';
import { getPreviousDrafts } from '../reducers/draft';

class DraftsList extends React.Component<any, any> {
    createDraft() {
        this.props.createDraft();
    }

    render() {
        return (
            <div>
                <button onClick={this.props.createDraft}>Create Draft</button>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    drafts: getPreviousDrafts(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getPreviousDrafts: () => dispatch(getPreviousDraftsEffect()),
    createDraft: () => dispatch(createDraftEffect())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftsList);