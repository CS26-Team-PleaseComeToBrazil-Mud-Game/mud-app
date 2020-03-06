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
        backgroundImage: `url(${controller})`,
        maxWidth: "125px",
        height: "125px",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center'
    },
    topDiv: {
        textAlign: 'center',
        height: '43px',
        width: "40%",
    },
    midDiv:{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '40px'
    },
    leftRight: {
        width: '40px'
    }
}))

function Game() {
    const [world, setWorld] = useState(null)
    // store world data in context?
    const classes = useStyles()
    useEffect(() => {
        const source = axios.CancelToken.source()

        async function fetchData() {
            try {
                const res = await axios.get("/adv/world/", {
                    cancelToken: source.token,
                })
                // console.log("res data", res.data)
                setWorld({...res.data})
            } catch (err) {
                // ignore error raised by canceling request
                if (axios.isCancel(err)) {
                    return
                }

                // console.log("Error fetching /adv/world/", err.response)
                return
            }
        }

        fetchData()
        // cancel api request on dismount
        return () => source.cancel()
    }, [])

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} style={{position: "relative"}}>
                    {world && <MapCanvas data={world} />}
                </Grid>
            </Grid>

           
            <div className={classes.controllerDiv}>
                <div className={classes.topDiv}></div>
                <div className={classes.midDiv}>
                    <div className={classes.leftRight}></div>
                    <div className={classes.leftRight}></div>
                </div>
                <div className={classes.topDiv}></div>
            </div>
        </>
    )
}

export default Game
