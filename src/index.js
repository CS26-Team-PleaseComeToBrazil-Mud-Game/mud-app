import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import CssBaseline from "@material-ui/core/CssBaseline"
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(
    <BrowserRouter>
        <CssBaseline />
        <App />
    </BrowserRouter>,
    document.getElementById("root"),
)

// Updates the app without refreshing the browser in development
if (process.env.NODE_ENV === "development") {
    module.hot.accept()
}
