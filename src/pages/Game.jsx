import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
// import test_data from "../../test-utils/mock_data/sample_res"
// import test_data3x3 from "../../test-utils/mock_data/sample_res_3x3"
// import test_data10x10 from "../../test-utils/mock_data/sample_res_10x10"

//Components
import MapCanvas from "../components/MapCanvas"

// Mui
import Grid from "@material-ui/core/Grid"

function Game() {
    const [world, setWorld] = useState(null)
    // store world data in context?

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
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                {world && <MapCanvas data={world} />}
            </Grid>
        </Grid>
    )
}

export default Game
