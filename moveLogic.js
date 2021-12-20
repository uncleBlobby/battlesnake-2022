function dontHitNeck(gameData, safeMoves){
    const myHead = gameData.you.head;
    const myNeck = gameData.you.body[1];

    if (myNeck.x < myHead.x) {
        safeMoves.left = false;
    }
    if (myNeck.x > myHead.x) {
        safeMoves.right = false;
    }
    if (myNeck.y < myHead.y) {
        safeMoves.down = false;
    }
    if (myNeck.y > myHead.y) {
        safeMoves.up = false;
    }

    return safeMoves;
}

function dontHitWalls(gameData, safeMoves){
    const myHead = gameData.you.head;
    const width = gameData.board.width;
    const height = gameData.board.height;

    if (myHead.x == 0){
        safeMoves.left = false;
    }
    if (myHead.x == width - 1){
        safeMoves.right = false;
    }
    if (myHead.y == 0){
        safeMoves.down = false;
    }
    if (myHead.y == height - 1){
        safeMoves.up = false;
    }

    return safeMoves;
}

function dontHitOwnBody(gameData, safeMoves){
    const myHead = gameData.you.head;
    const myBody = gameData.you.body;

    for(let i = 0; i < myBody.length; i++){
        if((myHead.x - 1 == myBody[i].x) && (myHead.y == myBody[i].y)){
            safeMoves.left = false;
        }
        if((myHead.x + 1 == myBody[i].x) && (myHead.y == myBody[i].y)){
            safeMoves.right = false;
        }
        if((myHead.y - 1 == myBody[i].y) && (myHead.x == myBody[i].x)){
            safeMoves.down = false;
        }
        if((myHead.y + 1 == myBody[i].y) && (myHead.x == myBody[i].x)){
            safeMoves.up = false;
        }
    }

    return safeMoves;
}

function dontHitOtherSnakes(gameData, safeMoves){
    const myHead = gameData.you.head;
    const snakes = gameData.board.snakes;

    for(let i = 0; i < snakes.length; i++){
        for(let j = 0; j < snakes[i].length; j++){
            if((myHead.x - 1 == snakes[i].body[j].x) && (myHead.y == snakes[i].body[j].y)){
                safeMoves.left = false;
            }
            if((myHead.x + 1 == snakes[i].body[j].x) && (myHead.y == snakes[i].body[j].y)){
                safeMoves.right = false;
            }
            if((myHead.y - 1 == snakes[i].body[j].y) && (myHead.x == snakes[i].body[j].x)){
                safeMoves.down = false;
            }
            if((myHead.y + 1 == snakes[i].body[j].y) && (myHead.x == snakes[i].body[j].x)){
                safeMoves.up = false;
            }
        }
    }

    return safeMoves;
}

function beAwareOfHazardSauce(gameData){
    const myHead = gameData.you.head;
    const hazards = gameData.board.hazards;
    
    //hazards are the same data shape as snakes, an array of objects
    //each hazard has one x and one y

    for(let i = 0; i < hazards.length; i++){
        if((myHead.x - 1 == hazards[i].x) && (myHead.y == hazards[i].y)){
            hazards.left = true;
        }
        if((myHead.x + 1 == hazards[i].x) && (myHead.y == hazards[i].y)){
            hazards.right = true;
        }
        if((myHead.x == hazards[i].x) && (myHead.y - 1 == hazards[i].y)){
            hazards.down = true;
        }
        if((myHead.x == hazards[i].x) && (myHead.y + 1 == hazards[i].y)){
            hazards.up = true;
        }
    }

    return hazards;
}

function siftHazardMovesIfPossible(safeMoves, hazards){
    for( const direction in hazards ){
        if(hazards[direction]){
            let index = direction;
            safeMoves.index = false;
        }
    }

    return safeMoves;
}

function findCloseFood(gameData, safeMoves){
    const food = gameData.board.food;
    // loop over each food object in the food array, and add a property for distance to my head
    for(let i = 0; i < food.length; i++){
        food[i].distance = findDistanceToCoord(gameData.you.head, food[i].x, food[i].y);
    }

    //console.log(food);
    // loop over each food object in the food array and return the one with the lowest distance

    let closestFood = food[0];
    for(let i = 1; i < food.length; i++){
        if(food[i].distance < closestFood.distance)
        {
            food[i] = closestFood;
        }     
    }

    //console.log(closestFood);
    return closestFood;
}

function moveTowardCloseFoodIfSafe(gameData, closestFood, safeMoves){
    const myHead = gameData.you.head;
    if(!closestFood){
        return chooseMove(safeMoves);
    }
    if((closestFood.x < myHead.x) && (safeMoves.left == true)){
        return "left";
    }
    if((closestFood.x > myHead.x) && (safeMoves.right == true)){
        return "right";
    }
    if((closestFood.y < myHead.y) && (safeMoves.down == true)){
        return "down";
    }
    if((closestFood.y > myHead.y) && (safeMoves.up == true)){
        return "up";
    }
    else {
        return chooseMove(safeMoves);
    }
}

function findDistanceToCoord(myHead, targetX, targetY){
    let xDistance = Math.abs(myHead.x - targetX);
    let yDistance = Math.abs(myHead.y - targetY);
    let totalDistance = xDistance + yDistance;
    return totalDistance;
}


function chooseMove(safeMoves){
    console.log(`safeMoves: ${JSON.stringify(safeMoves)}`);
    //make array of safe moves from safemoves object
    let arrayMoves = [];
    for(const dir in safeMoves){
        
        //console.log(`${dir}: ${safeMoves[dir]}`)
        if(safeMoves[dir])
        {
            arrayMoves.push(dir);
        }
    }
    console.log(`choosing random move`);
    console.log(arrayMoves);
    let randomChoice = returnRandomArrayIndex(arrayMoves);
    console.log(`randomChoice: ${randomChoice}`);
    return arrayMoves[randomChoice];
}

function returnRandomArrayIndex(array){
    let min = 0;
    let max = array.length - 1;
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    dontHitNeck: dontHitNeck,
    dontHitWalls: dontHitWalls,
    dontHitOwnBody: dontHitOwnBody,
    dontHitOtherSnakes: dontHitOtherSnakes,
    beAwareOfHazardSauce: beAwareOfHazardSauce,
    siftHazardMovesIfPossible: siftHazardMovesIfPossible,
    findCloseFood: findCloseFood,
    moveTowardCloseFoodIfSafe: moveTowardCloseFoodIfSafe,
    chooseMove: chooseMove,
    returnRandomArrayIndex: returnRandomArrayIndex
}