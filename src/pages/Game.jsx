import React, {useRef, useEffect} from "react"

import tiles from "../utils/tiles"
import atlasImage from "../assets/images/tunnel_tiles.webp"

function Game(props) {
    const canvas = useRef(null)
    const image = useRef(null)
    const {rooms, width, height} = props.data

    useEffect(() => {
        const ctx = canvas.current.getContext("2d")
        const imctx = image.current

        imctx.onload = () => {
            for (let row = 0; row < height; row++) {
                for (let col = 0; col < width; col++) {
                    // get tile from room
                    const tile = rooms[`r${row}c${col}`].tile_num
                    // draw the tile to canvas
                    ctx.drawImage(
                        imctx,
                        tiles[tile].x,
                        tiles[tile].y,
                        70,
                        70,
                        row * 70,
                        col * 70,
                        70,
                        70,
                    )
                }
            }
        }
    }, [])

    return (
        <>
            <canvas
                ref={canvas}
                width={width * 70}
                height={height * 70}
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

export default Game
