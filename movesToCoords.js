function movesToCoords(move){
    switch(move){
        case "up":
            return {x: 0, y: -1};
        case "down":
            return {x: 0, y: 1};
        case "left":
            return {x: -1, y: 0};
        case "right":
            return {x: 1, y: 0};
    }
}