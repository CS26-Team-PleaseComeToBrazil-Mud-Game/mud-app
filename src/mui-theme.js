import {createMuiTheme} from "@material-ui/core"
import red from "@material-ui/core/colors/red"

const RED_LIGHT = red["500"]
const RED = red["700"]
const RED_DARK = red["900"]

const BROWN_LIGHT = "hsl(27deg, 31%, 58%)"
const BROWN = "hsl(27deg, 31%, 43%)"
const BROWN_DARK = "hsl(20deg, 74%, 15%)"

const BLACK = "#111111"

export default createMuiTheme({
    palette: {
        type: "dark",
        secondary: {
            light: RED_LIGHT,
            main: RED,
            dark: RED_DARK,
            contrastText: BLACK,
        },
        primary: {
            light: BROWN_LIGHT,
            main: BROWN,
            dark: BROWN_DARK,
            contrastText: BLACK,
        },
    },
    shape: {
        borderRadiusLg: "8px",
    },
    overrides: {
        MuiButton: {
            contained: {
                backgroundColor: BLACK,
                color: RED,
                "&:hover": {
                    border: `2px solid ${RED} `,
                },
            },
            containedPrimary: {
                "&:hover": {
                    border: `2px solid ${RED} `,
                },
            },
        },
    },
})
