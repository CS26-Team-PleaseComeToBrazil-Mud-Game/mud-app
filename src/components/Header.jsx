import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import clsx from "clsx"

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
        cursor: "pointer",
    },
    toolbarOffset: theme.mixins.toolbar,
}))

function Header() {
    const winHistory = useHistory()
    const {title, menuButton, toolbarOffset} = useStyles()
    const {
        state: {userToken},
        dispatch,
    } = useContext(AppContext)

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={title}
                        title="return to home page"
                        onClick={() => winHistory.push("/")}
                    >
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
                            onClick={() => {
                                window.localStorage.removeItem("ant_game_token")
                                dispatch({
                                    type: actn.updateUser,
                                    payload: {userToken: null},
                                })
                                winHistory.push("/")
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            {/* <div className={toolbarOffset} /> */}
        </>
    )
}

export default Header
