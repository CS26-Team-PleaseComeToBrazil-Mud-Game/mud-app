var map = {
    cols: 10,
    rows: 10,
    tsize: 64,
    tiles: [],

    getTile: function(col, row){
        return this.tiles[row * map.cols + col]
    }
}