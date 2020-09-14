import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    HomeComposition,
    PoolComposition,
    UniComposition,
    FarmComposition,
    StatsComposition,
} from 'compositions';

import 'assets/scss/index.scss';

class MainScreen extends Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={HomeComposition} />
                    <Route path='/farm' exact={true} component={FarmComposition} />
                    <Route path='/farm-shib' exact={true} component={PoolComposition} />
                    <Route path='/farm-uni' exact={true} component={UniComposition} />
                    <Route path='/stats' exact={true} component={StatsComposition} />
                </Switch>
            </Router>
        );
    }
}

export default MainScreen;