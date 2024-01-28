var currentBoard = [["","","","","",""],
                    ["","","","","",""],
                    ["","","","","",""]]



var possibleBoards = [[ ["f","s","u","f","c","m"],
                        ["v","m","c","u","m","v"],
                        ["s","f","s","m","f","s"]],

                       [["u","m","v","m","f","s"],
                        ["m","v","s","c","c","f"],
                        ["s","u","f","m","f","s"]]]

function findBoards(currentBoard, possibleBoards){
    var foundBoards = possibleBoards
    for(lineIndex in currentBoard){
        var line = currentBoard[lineIndex]
        console.log(line)
        for(charIndex in line){
            char = line[charIndex]
            if(char != ""){
                tempBoards = foundBoards
                for(boardIndex in foundBoards){
                    board = foundBoards[boardIndex]
                    if(board[lineIndex][charIndex] != char){
                        tempBoards = tempBoards.filter(function(e) { return e !== board })
                        if(tempBoards.length == 0){
                            return []
                        }
                    }
                }
                foundBoards = tempBoards
            }
        }
    } 
    return foundBoards
}

