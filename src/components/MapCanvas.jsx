import React, {useState, useRef, useEffect} from "react"
import tiles from "../utils/tiles"
import atlasImage from "../assets/images/tunnel_tiles.webp"
import propTypes from "prop-types"

const MapCanvas = props => {
    const canvas = useRef(null)
    const image = useRef(null)
    const {rooms, width, height} = props.data
    const [tileSize, setTileSize] = useState(70)

    useEffect(() => {
        const ctx = canvas.current.getContext("2d")
        const imctx = image.current

        imctx.onload = () => {
            for (let row = 0; row < height; row++) {
                for (let col = 0; col < width; col++) {
                    // get tile from room
                    const room = rooms[`r${row}c${col}`]
                    const tile = room.tile_num
                    // draw the tile to canvas
                    ctx.drawImage(
                        imctx,
                        tiles[tile].x,
                        tiles[tile].y,
                        tileSize,
                        tileSize,
                        col * tileSize,
                        row * tileSize,
                        tileSize,
                        tileSize,
                    )
                }
            }
        }
    }, [])

    return (
        <>
            <canvas
                ref={canvas}
                width={width * tileSize}
                height={height * tileSize}
                style={{border: "5px solid red"}}
                id="canvas"
            ></canvas>
            <img
                ref={image}
                src={atlasImage}
                width={1050}
                height={70}
                style={{visibility: "hidden"}}
            ></img>
        </>
    )
}

MapCanvas.propTypes = {
    data: propTypes.object,
}

export default MapCanvas
