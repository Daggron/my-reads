import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Search from './components/Search';
import NotFound from './components/NotFound';
import './App.css'

const App = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default App;