import React from "react"
import OnboardingForm from "OnboardingForm"
import {Route} from "react-router-dom"

import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },
}))

function Onboarding(props) {
    const {container} = useStyles()

    return (
        <div className={container}>
            <Route
                path={`${props.match.path}/login`}
                component={OnboardingForm}
            />
            <Route
                path={`${props.match.path}/register`}
                component={OnboardingForm}
            />
        </div>
    )
}

export default Onboarding
