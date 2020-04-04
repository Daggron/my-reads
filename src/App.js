import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import './App.css'
import Search from './components/Search';

const App = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="*" component={Error.js} />
        </Switch>
    )
}

export default App;