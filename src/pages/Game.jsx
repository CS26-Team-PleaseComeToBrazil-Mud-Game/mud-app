import React, {useRef, useEffect} from "react"

import {response_data, tiles} from "../utils/tiles"
import atlasImage from "../assets/images/tunnel_tiles.png"

// var map = {
//     cols: 10,
//     rows: 10,
//     tsize: 64,
//     tiles: [1, 2, 3, 4, 5, 1, 2, 3, 4],

//     getTile: function(col, row) {
//         return this.tiles[row * map.cols + col]
//     },
// }

function Game() {
    const canvas = useRef(null)
    const image = useRef(null)
    const {rooms, width, height} = response_data

    useEffect(() => {
        const ctx = canvas.current.getContext("2d")
        const imctx = image.current

        imctx.onload = () =>{
            for (let row = 0; row < response_data.height; row++) {
                // console.log('row',row)
                for (let col = 0; col < response_data.width; col++) {
                // console.log('col',col)
                    // get tile from room
                    const tile = rooms[`r${row}c${col}`].tile_num
                    console.log(tile)
                    // draw the tile to canvas
                        console.log(`tile coordinates x: ${tiles[tile].x} y: ${tiles[tile].y}`)
                        let x = 70
                        let y = 0
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
                width={350}
                height={70}
                style={{visibility: "hidden"}}
            ></img>
        </>
    )
}

export default Game
