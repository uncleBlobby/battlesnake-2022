running locally:

battlesnake play -W 11 -H 11 --name test --url http://127.0.0.1:3000 --name test2 --url http://127.0.0.1:3001 -v


# solo game:

battlesnake play -W 11 -H 11 --name blobSnakeFoodTest --url http://127.0.0.1:3000 -g solo -v

## duel against old blobSnake
### royale mode:

battlesnake play -W 11 -H 11 --name anti-blobby --url http://127.0.0.1:3000 --name blobSnake --url http://127.0.0.1:3001 -g royale -v


battlesnake play -W 11 -H 11 --name anti-blobby --url http://127.0.0.1:3000 --name blobSnake --url http://127.0.0.1:3001 -g royale -v

## from testing folder
runs 10 matches and prints all their results to results.txt
./run100.sh > results.txt 2>&1