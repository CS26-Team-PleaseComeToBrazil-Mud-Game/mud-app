import React from "react"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Ant from "Ant"

function Home() {
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: "100vh", marginTop: "-72px"}}
        >
            <Grid item>
                <Typography variant="h1" align="center" color="secondary">
                    Ant Adventure
                </Typography>
            </Grid>
            <div style={{width: "426px", height: "259px"}}>
                <Ant />
            </div>
            <Grid item></Grid>
        </Grid>
    )
}

export default Home
