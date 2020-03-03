import React from "react"
import {useHistory} from "react-router-dom"
import clsx from "clsx"

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
}))

function Header() {
    const winHistory = useHistory()
    const {title, menuButton} = useStyles()

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={clsx(title)}>
                    Ant Adventure
                </Typography>
                <Button className={menuButton} variant="contained">
                    Login
                </Button>
                <Button className={clsx(menuButton)} variant="contained">
                    Register
                </Button>
                <Button className={clsx(menuButton)} variant="contained">
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header
