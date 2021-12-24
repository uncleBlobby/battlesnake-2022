#Bug List

0. Get out of hazard before health runs out!
1. Don't go for center food if another snake of equal length is also (potentially) going for it.
2. Don't go for any food that another snake of equal length is also (potentially) going for.
3. Problem with turning into enemies of the same length: [here](https://play.battlesnake.com/g/b97f06f5-3314-49b5-b0ac-d095b56f4bb3/)
    - should be looking down and seeing that there is an equal or longer snake
    - should be looking up and seeing that there is as shorter length snake
    - should have moved up, not down (Dumbass)
4. Don't wrap yourself up or tie yourself in a knot.
    - look before you turn, find total area of squares available to move to from that position.
    - choose the bigger!
    - FLOOD FILL? !?!?! ?


#Obvious Solutions

0. Make food priority a lower priority than avoiding enemy heads
    - currently, snake will take the risky move toward food even if an enemy might kill it
    - should instead avoid that food in order to survive rather than take the risk!

#updates todo:

move all updates on the directions object to a separate module
re-organize the chosenMove logic so that food is less priority than staying alive
write a new move sorting algorithm that contains all of the above :) (Good luck future blobby)