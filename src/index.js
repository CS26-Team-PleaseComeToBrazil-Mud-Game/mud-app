import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import CssBaseline from "@material-ui/core/CssBaseline"
import {BrowserRouter} from "react-router-dom"
import {CookiesProvider} from "react-cookie"

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById("root"),
)

// Updates the app without refreshing the browser in development
if (process.env.NODE_ENV === "development") {
    module.hot.accept()
}
