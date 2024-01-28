var currentBoard = [["","","","","",""],
                    ["","","","","",""],
                    ["","","","","",""]]



var possibleBoards = [[ ["f","s","u","f","c","m"],
                        ["v","m","c","u","m","v"],
                        ["s","f","s","m","f","s"]],

                       [["u","m","v","m","f","s"],
                        ["m","v","s","c","c","f"],
                        ["s","u","f","m","f","s"]],
                       
                       [["f","v","u","f","u","m"],
                        ["s","m","c","s","m","v"],
                        ["s","f","c","m","f","s"]],
                       
                       [["f","c","m","s","u","f"],
                        ["u","f","v","m","c","s"],
                        ["m","v","s","m","f","s"]],

                       [["m","f","c","f","v","s"],
                        ["c","u","m","v","u","f"],
                        ["s","m","s","m","f","s"]],
                    
                       [["m","f","c","m","v","s"],
                        ["f","u","m","v","u","c"],
                        ["s","f","s","m","f","s"]],
                    
                       [["m","f","u","f","s","s"],
                        ["c","s","m","v","u","f"],
                        ["c","m","v","m","f","s"]],

                       [["f","s","u","f","u","m"],
                        ["v","m","f","s","m","v"],
                        ["s","c","c","m","f","s"]],
                    ]

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

