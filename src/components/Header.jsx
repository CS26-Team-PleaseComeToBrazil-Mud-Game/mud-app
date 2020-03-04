import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import clsx from "clsx"
import axios from "axios"
import {useCookies} from "react-cookie"
// Components
import {AppContext, actn} from "Context"

// MUI
import {makeStyles} from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "red",
    },
    toolbarOffset: theme.mixins.toolbar,
}))

function Header() {
    const winHistory = useHistory()
    const {title, menuButton, toolbarOffset} = useStyles()
    const [cookies, setCookie, removeCookie] = useCookies(["csrftoken"])
    const {
        state: {userToken},
        dispatch,
    } = useContext(AppContext)

    function logout() {
        axios({
            method: "post",
            url:
                process.env.NODE_ENV === "production"
                    ? "https://ant-mud.herokuapp.com/api/logout/"
                    : "http://localhost:8000/api/logout/",
            // tell server which session to end
            withCredentials: true,
            xsrfCookieName: "csrftoken",
            xsrfHeaderName: "X-CSRFToken",
        })
            .then(res => {
                console.log("logout success", res)
                removeCookie("crftoken")
            })
            .catch(err => console.log("logout error", err))
        // remove token from local storage
        window.localStorage.removeItem("ant_game_token")
        // remove token from store
        dispatch({
            type: actn.updateUser,
            payload: {userToken: null},
        })
        winHistory.push("/")
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={clsx(title)}>
                        Ant Adventure
                    </Typography>
                    {!userToken && (
                        <>
                            <Button
                                className={menuButton}
                                variant="contained"
                                onClick={() =>
                                    winHistory.push("/onboarding/login")
                                }
                            >
                                Login
                            </Button>
                            <Button
                                className={clsx(menuButton)}
                                variant="contained"
                                onClick={() =>
                                    winHistory.push("/onboarding/register")
                                }
                            >
                                Register
                            </Button>
                        </>
                    )}
                    {userToken && (
                        <Button
                            className={clsx(menuButton)}
                            variant="contained"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
