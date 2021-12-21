function checkIfSafe(move, directions){
    switch(move){
        case "left":
            return directions.left.safe;
        case "right":
            return directions.right.safe;
        case "down":
            return directions.down.safe;
        case "up":
            return directions.up.safe;
    };
};

function checkIfHazard(move, directions){
    switch(move){
        case "left":
            return directions.left.hazard;
        case "right":
            return directions.right.hazard;
        case "down":
            return directions.down.hazard;
        case "up":
            return directions.up.hazard;
    };
}

function safeArray(directions){
    let arr = [];
    if(checkIfSafe("left", directions)) { arr.push("left"); }
    if(checkIfSafe("right", directions)) { arr.push("right"); }
    if(checkIfSafe("down", directions)) { arr.push("down"); }
    if(checkIfSafe("up", directions)) { arr.push("up"); }
    return arr;
};

function hazardsArray(directions){
    let arr = [];
    if(checkIfHazard("left", directions)) { arr.push("left"); }
    if(checkIfHazard("right", directions)) { arr.push("right"); }
    if(checkIfHazard("down", directions)) { arr.push("down"); }
    if(checkIfHazard("up", directions)) { arr.push("up"); }
    return arr;
}

function dontHitNeck(gameData, directions){
    if((!gameData) || (!directions)) {
        console.error(`ERROR: missing gameData or directions object`);
        return false;
    };

    const myHead = gameData.you.head;
    const myNeck = gameData.you.body[1];

    if (myNeck.x < myHead.x) {
        directions.left.safe = false;
    };
    if (myNeck.x > myHead.x) {
        directions.right.safe = false;
    };
    if (myNeck.y < myHead.y) {
        directions.down.safe = false;
    };
    if (myNeck.y > myHead.y) {
        directions.up.safe = false;
    };

    return directions;
};

function dontHitWalls(gameData, directions){
    if((!gameData) || (!directions)) {
        console.error(`ERROR: missing gameData or directions object`);
        return false;
    };
    
    const myHead = gameData.you.head;
    const width = gameData.board.width;
    const height = gameData.board.height;

    if (myHead.x == 0){
        directions.left.safe = false;
    };
    if (myHead.x == width - 1){
        directions.right.safe = false;
    };
    if (myHead.y == 0){
        directions.down.safe = false;
    };
    if (myHead.y == height - 1){
        directions.up.safe = false;
    };

    return directions;
};

function dontHitOwnBody(gameData, directions){
    if((!gameData) || (!directions)) {
        console.error(`ERROR: missing gameData or directions object`);
        return false;
    };

    const myHead = gameData.you.head;
    const myBody = gameData.you.body;

    for(let i = 0; i < myBody.length; i++){
        if((myHead.x - 1 == myBody[i].x) && (myHead.y == myBody[i].y)){
            directions.left.safe = false;
        };
        if((myHead.x + 1 == myBody[i].x) && (myHead.y == myBody[i].y)){
            directions.right.safe = false;
        };
        if((myHead.y - 1 == myBody[i].y) && (myHead.x == myBody[i].x)){
            directions.down.safe = false;
        };
        if((myHead.y + 1 == myBody[i].y) && (myHead.x == myBody[i].x)){
            directions.up.safe = false;
        };
    };

    return directions;
};

function dontHitOtherSnakes(gameData, directions){
    if((!gameData) || (!directions)) {
        console.error(`ERROR: missing gameData or directions object`);
        return false;
    };

    const myHead = gameData.you.head;
    const snakes = gameData.board.snakes;

    for(let i = 0; i < snakes.length; i++){
        for(let j = 0; j < snakes[i].length; j++){
            if((myHead.x - 1 == snakes[i].body[j].x) && (myHead.y == snakes[i].body[j].y)){
                directions.left.safe = false;
            };
            if((myHead.x + 1 == snakes[i].body[j].x) && (myHead.y == snakes[i].body[j].y)){
                directions.right.safe = false;
            };
            if((myHead.y - 1 == snakes[i].body[j].y) && (myHead.x == snakes[i].body[j].x)){
                directions.down.safe = false;
            }
            if((myHead.y + 1 == snakes[i].body[j].y) && (myHead.x == snakes[i].body[j].x)){
                directions.up.safe = false;
            };
        };
    };

    return directions;
};

function beAwareOfHazardSauce(gameData, directions){
    if((!gameData) || (!directions)) {
        console.error(`ERROR: missing gameData or directions object`);
        return false;
    };

    const myHead = gameData.you.head;
    const hazards = gameData.board.hazards;
    
    //hazards are the same data shape as snakes, an array of objects
    //each hazard has one x and one y

    for(let i = 0; i < hazards.length; i++){
        if((myHead.x - 1 == hazards[i].x) && (myHead.y == hazards[i].y)){
            directions.left.hazard = true;
        };
        if((myHead.x + 1 == hazards[i].x) && (myHead.y == hazards[i].y)){
            directions.right.hazard = true;
        };
        if((myHead.x == hazards[i].x) && (myHead.y - 1 == hazards[i].y)){
            directions.down.hazard = true;
        };
        if((myHead.x == hazards[i].x) && (myHead.y + 1 == hazards[i].y)){
            directions.up.hazard = true;
        };
    };

    return directions;
};

// TODO: rewrite this, doesn't work at all
function siftHazardMovesIfPossible(safeMoves, hazards){
    for( const direction in hazards ){
        if(hazards[direction]){
            let index = direction;
            safeMoves.index = false;
        }
    }

    return safeMoves;
}

function findCloseFood(gameData){
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

function moveTowardCloseFoodIfSafe(gameData, closestFood, directions){
    const myHead = gameData.you.head;
    if(!closestFood){
        return chooseMove(directions);
    }
    if((closestFood.x < myHead.x) && (checkIfSafe("left", directions))){
        return "left";
    }
    if((closestFood.x > myHead.x) && (checkIfSafe("right", directions))){
        return "right";
    }
    if((closestFood.y < myHead.y) && (checkIfSafe("down", directions))){
        return "down";
    }
    if((closestFood.y > myHead.y) && (checkIfSafe("up", directions))){
        return "up";
    }
    else {
        return chooseMove(directions);
    }
}

function findDistanceToCoord(myHead, targetX, targetY){
    let xDistance = Math.abs(myHead.x - targetX);
    let yDistance = Math.abs(myHead.y - targetY);
    let totalDistance = xDistance + yDistance;
    return totalDistance;
}

function removeHazardsFromSafe(hazArr, safArr){
    for(let i = 0; i < hazArr.length; i++){
        for(let j = 0; j < safArr.length; j++){
            if(hazArr[i] == safArr[j]){
                safArr.splice(j, 1);
            };
        };
    };
    return safArr;
};

function chooseMove(directions){
    console.log(`safeMoves: ${JSON.stringify(directions)}`);
    //make array of safe moves from safemoves object
    let arraySafeMoves = safeArray(directions);
    let arrayHazardMoves = hazardsArray(directions);
    console.log(`removing hazards from safe moves`);
    if(arraySafeMoves.length > arrayHazardMoves.length){
        arraySafeMoves = removeHazardsFromSafe(arrayHazardMoves, arraySafeMoves);
    }
    
    console.log(`choosing random move`);
    console.log(arraySafeMoves);
    if(arraySafeMoves.length != 0){
        let randomChoice = returnRandomArrayIndex(arraySafeMoves);
        console.log(`randomChoice: ${randomChoice}`);
        return arraySafeMoves[randomChoice];
    }
    if((arraySafeMoves.length == 0) && (arrayHazardMoves.length != 0)){
        let randomChoice = returnRandomArrayIndex(arrayHazardMoves);
        console.log(`randomChoice [hazardMove]: ${randomChoice}`);
        return arrayHazardMoves[randomChoice];
    }

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