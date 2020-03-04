import React, {useRef, useEffect} from "react"

import MapCanvas from '../components/MapCanvas'
import {response_data, tiles} from "../utils/tiles"
import atlasImage from "../assets/images/tunnel_tiles.png"


function Game() {
    
    return (
        <>
            <MapCanvas 
                data={response_data}
                tiles={tiles}    
                img={atlasImage}
            />
        </>
    )
}

export default Game
