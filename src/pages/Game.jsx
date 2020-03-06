import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
// import test_data from "../../test-utils/mock_data/sample_res"
// import test_data3x3 from "../../test-utils/mock_data/sample_res_3x3"
// import test_data10x10 from "../../test-utils/mock_data/sample_res_10x10"
import {makeStyles} from "@material-ui/core/styles"
import controller from "../assets/images/controller.webp"
//Components
import MapCanvas from "../components/MapCanvas"

// Mui
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
    controllerDiv: {
        margin: "0 auto",
        backgroundImage: `url(${controller})`,
        width: "120px",
        height: "120px",
        backgroundPosition: "center",
    },
    centeredButtonRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40px",
    },
    midControllerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "40px",
    },
    controllerButton: {
        margin: "4px",
        height: "25px",
        width: "25px",
        borderRadius: "50%",
        backgroundColor: "red",
        cursor: "pointer",
    },
    canvasWrapper: {
        width: "700px",
        height: "700px",
        position: "relative",
        margin: "16px auto",
        pointerEvents: "none",
    },
}))

const movePlayer = (direction, cb) => {
    axios
        .post("/adv/move/", {direction})
        .then(res => {
            if (res.data.error_msg) {
                return
            }
            cb({row: res.data.new_row, col: res.data.new_col})
        })
        .catch(err => console.log(`Error moving player: ${err}`))
}

function Game() {
    const [world, setWorld] = useState(null)
    const [playerPosition, setPlayerPosition] = useState({})
    // store world data in context?
    const classes = useStyles()
    useEffect(() => {
        const source = axios.CancelToken.source()

        async function fetchWorld() {
            try {
                const res = await axios.get("/adv/world/", {
                    cancelToken: source.token,
                })

                setWorld({...res.data})
                setPlayerPosition({
                    row: res.data.start_row,
                    col: res.data.start_col,
                })
            } catch (err) {
                // ignore error raised by canceling request
                if (axios.isCancel(err)) {
                    return
                }

                return
            }
        }

        fetchWorld()
        // cancel api request on dismount
        return () => source.cancel()
    }, [])

    return (
        <>
            <Grid container direction="column" justify="center" spacing={4}>
                <Grid item xs={12}>
                    <div className={classes.canvasWrapper}>
                        {world && playerPosition && (
                            <MapCanvas data={world} position={playerPosition} />
                        )}
                    </div>
                </Grid>
                {/* <Grid item xs={12}> */}
                <div className={classes.controllerDiv}>
                    <div className={classes.centeredButtonRow}>
                        <div
                            className={classes.controllerButton}
                            onClick={() => movePlayer("n", setPlayerPosition)}
                        ></div>
                    </div>
                    <div className={classes.midControllerRow}>
                        <div
                            className={classes.controllerButton}
                            onClick={() => movePlayer("w", setPlayerPosition)}
                        ></div>
                        <div
                            className={classes.controllerButton}
                            onClick={() => movePlayer("e", setPlayerPosition)}
                        ></div>
                    </div>
                    <div className={classes.centeredButtonRow}>
                        <div
                            className={classes.controllerButton}
                            onClick={() => movePlayer("s", setPlayerPosition)}
                        ></div>
                    </div>
                </div>
                {/* </Grid> */}
            </Grid>
        </>
    )
}

export default Game
