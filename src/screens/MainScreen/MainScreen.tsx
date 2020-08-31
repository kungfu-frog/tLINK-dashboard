import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    HomeComposition,
    GeyserComposition,
    PoolComposition,
} from 'compositions';

import 'assets/scss/index.scss';

class MainScreen extends Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={HomeComposition} />
                    <Route path='/geyser' exact={true} component={GeyserComposition} />
                    <Route path='/pool' exact={true} component={PoolComposition} />
                </Switch>
            </Router>
        );
    }
}

export default MainScreen;