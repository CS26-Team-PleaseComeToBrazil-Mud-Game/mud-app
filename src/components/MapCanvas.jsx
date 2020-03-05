import React, {useState, useRef, useEffect} from "react"
import tiles from "../utils/tiles"
import atlasImage from "../assets/images/tunnel_tiles.webp"
import sprite from "../assets/images/ant.webp"
import propTypes from "prop-types"

const MapCanvas = props => {
    const canvas = useRef(null)
    const canvas2 = useRef(null)
    const image = useRef(null)
    const spriteIm = useRef(null)
    const {rooms, width, height} = props.data
    
    const [tileSize, setTileSize] = useState(70)

    useEffect(() => {
        const ctx = canvas.current.getContext("2d")
        const ctx2 = canvas2.current.getContext("2d")
        const imctx = image.current
        const sprctx = spriteIm.current

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
        sprctx.onload = () => {
            draw(0, 0)
            function draw(x, y){
                
                ctx2.drawImage(sprctx, 0,0, tileSize, tileSize, x, y, tileSize, tileSize)
            }
        }
    }, [])

    return (
        <>
            <canvas
                ref={canvas}
                width={width * tileSize}
                height={height * tileSize}
                id="canvas"
            ></canvas>
             <canvas
                ref={canvas2}
                width={width * tileSize}
                height={height * tileSize}
                style={{ position: "absolute", top: "16", left: "16px"}}
            />
            <img
                ref={image}
                src={atlasImage}
                width={1050}
                height={70}
                style={{visibility: "hidden"}}
            ></img>
            <img
                ref={spriteIm}
                src={sprite}
                style={{visibility: "hidden"}}
            ></img>
        </>
    )
}

MapCanvas.propTypes = {
    data: propTypes.object,
}

export default MapCanvas
