import React from 'react';
import { connect } from 'react-redux';

import { createDraftEffect } from '../effects/createDrafts';
import { IDraft } from '../models/draft.interface';

class CreateDraft extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            settings: {
                QBs: { value: 1, name: 'QB' },
                RBs: { value: 2, name: 'RB' },
                WRs: { value: 2, name: 'WB' },
                TEs: { value: 1, name: 'TE' },
                FLEX: { value: 1, name: 'Flex' },
                BENCH: { value: 6, name: 'Bench' },
                DEF: { value: 1, name: 'DST' },
                K: { value: 1, name: 'K' },
                numTeams: { value: 12, name: 'Teams' },
                // userPosition: { value: 1, name: 'Position' }
            }
        };
    }

    onChange(e: any, key: string) {
        this.setState({
            settings: {
                ...this.state.settings,
                [key]: {
                    ...this.state.settings[key],
                    value: e.target.value
                }
            }
        });
    }

    decrement(key: string) {
        if (this.state.settings[key].value === 0) return;
        this.setState({
            settings: {
                ...this.state.settings,
                [key]: {
                    ...this.state.settings[key],
                    value: this.state.settings[key].value - 1
                }
            }
        });
    }

    increment(key: string) {
        this.setState({
            settings: {
                ...this.state.settings,
                [key]: {
                    ...this.state.settings[key],
                    value: this.state.settings[key].value + 1
                }
            }
        });
    }

    renderDraftOptions() {
        return Object.keys(this.state.settings)
            .map((key: string) => ({ key, value: this.state.settings[key] }))
            .map(option => {
                return (
                    <div className="draft-option" key={option.key}>
                        <span className="name">{option.value.name}</span>
                        <div className="incrementer">
                            <div onClick={() => this.decrement(option.key)}>-</div>
                            <input type="number" value={option.value.value} onChange={(e) => this.onChange(e, option.key)} />
                            <div onClick={() => this.increment(option.key)}>+</div>
                        </div>
                    </div>
                );
            });
    }

    createDraft() {
        const draft = Object.keys(this.state.settings)
            .map((key: string) => ({ key, value: this.state.settings[key] }))
            .reduce((acc, val) => ({
                ...acc,
                [val.key]: val.value.value,
                numRounds: val.key === 'numTeams' ? acc.numRounds : acc.numRounds + val.value.value
            }), { numRounds: 0, userPosition: 1 })

        this.props.createDraft(draft).then((id: string) => {
            this.props.history.push(`/drafts/${id}/rankings`);
        });
    }

    render() {
        return (
            <div className="CreateDraft">
                {this.renderDraftOptions()}
                <button onClick={this.createDraft.bind(this)}>Create Draft</button>
            </div>
        )
    }

}


const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
    createDraft: (draft: IDraft) => dispatch(createDraftEffect(draft))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateDraft);