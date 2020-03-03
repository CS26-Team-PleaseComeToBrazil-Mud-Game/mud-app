import React from "react"
import {Switch, Route, Link} from "react-router-dom"

// Components
import PrivateRoute from "PrivateRoute"
import Header from "Header"
import Context from "Context"

// Pages
import Home from "./pages/Home"
import Onboarding from "./pages/Onboarding"
import Game from "./pages/Game"

const App = props => {
    return (
        <>
            <Context>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/onboarding" component={Onboarding} />
                    <PrivateRoute path="/game" component={Game} />
                </Switch>
            </Context>
        </>
    )
}

export default App
