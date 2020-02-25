import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import DraftBoard from './DraftBoard';
import Rankings from './Rankings';


class DraftArena extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <Link to="/rankings">Rankings</Link>
                        &nbsp;
                        <Link to="/board">Board</Link>
                    </nav>

                    <Switch>
                        <Route path="/rankings">
                            <Rankings />
                        </Route>
                        <Route path="/board">
                            <DraftBoard />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftArena);