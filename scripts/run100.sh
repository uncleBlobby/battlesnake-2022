#!/bin/sh
for i in {1..100}
do
    battlesnake play -W 11 -H 11 --name anti-blobby --url http://127.0.0.1:3000 --name blobSnake --url http://127.0.0.1:3001 -g royale
done
