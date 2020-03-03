import React from "react"
import OnboardingForm from "OnboardingForm"
import {Route, useLocation, useHistory} from 'react-router-dom'


function Onboarding(props) {
    const winLocation = useLocation()
    const winHistory = useHistory()

    return (
        <div>
            <Route path={`${props.match.path}/login`} component={OnboardingForm}/>
            <Route path={`${props.match.path}/register`} component={OnboardingForm}/>
        </div>
    )
}

export default Onboarding
