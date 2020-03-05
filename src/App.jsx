import React from "react"
import {Switch, Route, Link} from "react-router-dom"
import {makeStyles, ThemeProvider} from "@material-ui/core/styles"
import theme from "./mui-theme"
import axios from "axios"

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
    "@global": {
        body: {
            backgroundImage: `url(${grass.default})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
        },
    },
}))

axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
        ? "https://ant-mud.herokuapp.com/api/"
        : "http://localhost:8000/api/"

const App = props => {
    const globalStyles = useStyles()

    return (
        <Context>
            <ThemeProvider theme={theme}>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/onboarding" component={Onboarding} />
                    <PrivateRoute path="/game" component={Game} />
                </Switch>
            </ThemeProvider>
        </Context>
    )
}

export default App
