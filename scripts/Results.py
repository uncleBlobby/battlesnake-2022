with open('./results.txt') as f:
    lines = f.readlines()

f.close()

blobWins = 0
antiBlobWins = 0

for i in range(0, len(lines)):
    #if len(lines[i]) < 100:
        #print(lines[i], end = "")
    if "DONE" in lines[i]:
        #print(lines[i], end = "")
        if "blobSnake" in lines[i]:
            blobWins += 1
        if "anti-blobby" in lines[i]:
            antiBlobWins += 1


print("Results:")
print("blobsnake: ",blobWins, " wins")
print("anti-blobby", antiBlobWins, " wins")
