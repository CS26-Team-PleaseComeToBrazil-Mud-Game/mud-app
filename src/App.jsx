import React from "react"
import {Switch, Route, Link} from "react-router-dom"
import {makeStyles, ThemeProvider} from "@material-ui/core/styles"
import theme from "./mui-theme"

// Components
import PrivateRoute from "PrivateRoute"
import Header from "Header"
import Context from "Context"

// Pages
import Home from "./pages/Home"
import Onboarding from "./pages/Onboarding"
import Game from "./pages/Game"

// background image
const grass = require("./assets/images/cross-section-of-soil.webp")

const useStyles = makeStyles(theme => ({
    container: {
        backgroundImage: `url(${grass.default})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        minWidth: "100vw",
    },
}))

const App = props => {
    const {container} = useStyles()
    return (
        <Context>
            <ThemeProvider theme={theme}>
                <div className={container}>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/onboarding" component={Onboarding} />
                        <PrivateRoute path="/game" component={Game} />
                    </Switch>
                </div>
            </ThemeProvider>
        </Context>
    )
}

export default App
