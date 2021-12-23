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



## update Dec 22 2021:

Worked on avoiding other snakes -- should now track other snake heads near own head and make safer moves accordingly.

For example, will look left before moving left -- if there is a snake that might move into that position, and it's bigger than self, should opt not to move that direction.

Started writing some logic to avoid boxing self in; that seems to be one of the pressing issues.
