import React, {useRef, useEffect} from "react"


const MapCanvas = props => {
    const canvas = useRef(null)
    const image = useRef(null)
    const {rooms, width, height} = props.data

    useEffect(() => {
        const ctx = canvas.current.getContext("2d")
        const imctx = image.current

        imctx.onload = () =>{
            for (let row = 0; row < height; row++) {
                // console.log('row',row)
                for (let col = 0; col < width; col++) {
                // console.log('col',col)
                    // get tile from room
                    const tile = rooms[`r${row}c${col}`].tile_num
                    // console.log(tile)
                    // draw the tile to canvas
                        console.log(`tile coordinates x: ${props.tiles[tile].x} y: ${props.tiles[tile].y}`)
                        let x = 70
                        let y = 0
                    ctx.drawImage(
                        imctx,
                        props.tiles[tile].x,
                        props.tiles[tile].y,
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
                src={props.img}
                width={350}
                height={70}
                style={{visibility: "hidden"}}
            ></img>
        </>
    )
}

export default MapCanvas