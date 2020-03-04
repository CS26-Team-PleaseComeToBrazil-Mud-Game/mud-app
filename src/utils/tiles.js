// example response from server /api/adv/world/
// store Room atttributes as dicts they can be converted to obj in js
export const response_data = {
    width: 2,
    height: 2,
    rooms: {
        r0c0: {
            title: "apple",
            column: 0,
            row: 0,
            n_to: null,
            s_to: {row: 1, col: 0},
            e_to: null,
            w_to: null,
            tile_num: 3,
        },
        r1c0: {
            title: "orange",
            column: 0,
            row: 1,
            n_to: {row: 0, col: 0},
            s_to: null,
            e_to: {row: 1, col: 1},
            w_to: null,
            tile_num: 2,
        },
        r0c1: {
            title: "banana",
            column: 1,
            row: 0,
            n_to: null,
            s_to: {row: 1, col: 1},
            e_to: null,
            w_to: null,
            tile_num: 2,
        },
        r1c1: {
            title: "melon",
            column: 1,
            row: 1,
            n_to: {row: 0, col: 1},
            s_to: null,
            e_to: null,
            w_to: {row: 1, col: 0},
            tile_num: 1,
        },
    },
}


export const tiles = {
    // key is corresponds to room.tile_num
    // value is x,y coordiates of the top left corner of the tile in the sprite
    1: {x: 0, y: 0},
    2: {x: 70, y: 0},
    3: {x: 140, y: 0},
}
