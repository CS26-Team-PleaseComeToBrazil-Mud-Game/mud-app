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
        cursor: 'pointer'
    },
    midDiv:{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '40px'
    },
    leftRight: {
        width: '40px',
        cursor: 'pointer'
    }
}));

const movePlayer = (direction, cb) => {
    axios.post('/adv/move/', {direction})
        .then(res => {
            if(res.data.error_msg){
                return 
            }                 
            cb({row: res.data.new_row, col: res.data.new_col})  
           
        }).catch(err => console.log(`Error moving player: ${err}`))
};

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
                setPlayerPosition({row: res.data.start_row, col: res.data.start_col})
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
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} style={{position: "relative"}}>
                    {world && playerPosition && <MapCanvas data={world} position={playerPosition} />}
                </Grid>
            </Grid>

           
            <div className={classes.controllerDiv}>
                <div className={classes.topDiv} onClick={() => movePlayer('n', setPlayerPosition)}></div>
                <div className={classes.midDiv}>
                    <div className={classes.leftRight} onClick={() => movePlayer('w', setPlayerPosition)}></div>
                    <div className={classes.leftRight} onClick={() => movePlayer('e', setPlayerPosition)}></div>
                </div>
                <div className={classes.topDiv} onClick={() => movePlayer('s', setPlayerPosition)}></div>
            </div>
        </>
    )
}

export default Game
