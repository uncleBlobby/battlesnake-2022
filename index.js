const bodyParser = require('body-parser');
const express = require('express');
const moveLogic = require('./moveLogic.js');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const app = express();
app.use(bodyParser.json());

app.get('/', handleIndex);
app.post('/start', handleStart);
app.post('/move', handleMove);
app.post('/end', handleEnd);

app.listen(PORT, HOST, () => console.log(`Battlesnake Server Listening at http://${HOST}:${PORT}`));

// GET BATTLESNAKE INFO

function handleIndex(request, response) {
    let battlesnakeInfo = {
        apiversion: '1',
        author: 'uncleBlobby',
        color: '#4B0082',
        head: 'happy',
        tail: 'round-bum',
        version: '0.1.0-alpha'
    };
    response.status(200).json(battlesnakeInfo);
    console.log(`index handled`);
};

// HANDLE GAME START EVENT
function handleStart(request, response) {
    response.status(200).send('ok');
    console.log(`start handled`);
};

function handleMove(request, response) {
    let gameData = request.body;
    let me = gameData.you;
    let enemies = moveLogic.findEnemyHeadsandLengths(gameData);
    me.directions = {
        left : {
            safe: true,
            hazard: false
        },
        right : {
            safe:true,
            hazard: false
        },
        down : {
            safe:true,
            hazard: false
        },
        up : {
            safe:true,
            hazard: false
        },
    }

    //console.log(me.directions);

    me.directions = moveLogic.dontHitNeck(gameData, me.directions);
    me.directions = moveLogic.dontHitWalls(gameData, me.directions);
    me.directions = moveLogic.dontHitOwnBody(gameData, me.directions);
    me.directions = moveLogic.dontHitOtherSnakes(gameData, me.directions);
    me.hazards = moveLogic.beAwareOfHazardSauce(gameData, me.directions);
    

    let closestFood = moveLogic.findCloseFood(gameData, me.directions);

    //me.chosenMove = moveLogic.chooseMove(me.safeMoves);
    me.chosenMove = moveLogic.moveTowardCloseFoodIfSafe(gameData, closestFood, me.directions);
    // logs all your snake info right before chosing move -- useful for debug
    //console.log(gameData.you.head);
    //console.log(gameData.you.directions);
    // logs location of all food
    //console.log(gameData.board.food);
    
    console.log(`moving: ${me.chosenMove}`);
    response.status(200).send({
        move: me.chosenMove
    });
}

function handleEnd(request, response) {
    console.log(`Game Ended`);
    response.status(200).send('ok');
}