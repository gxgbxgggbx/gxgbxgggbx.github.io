var foundBoard = false
var alreadyOpen = false

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

function setPictures(board){
    var numBoard = 
    [["","","","","",""],
     ["","","","","",""],
     ["","","","","",""]]
    for(rowIndex in board){
        for(collumnIndex in board[rowIndex]){
            var _char = board[rowIndex][collumnIndex]
            if(!_char == ""){
                var rowIndexPlusOne = parseInt(rowIndex) + 1
                var collumnIndexPlusOne = parseInt(collumnIndex) + 1
                document.getElementById(`r${rowIndexPlusOne}c${collumnIndexPlusOne}`).src = "assets/" + _char + ".png"
            }else{
                var rowIndexPlusOne = parseInt(rowIndex) + 1
                var collumnIndexPlusOne = parseInt(collumnIndex) + 1
                var possibleBoardsTemp = findBoards(board, possibleBoards)
                var possibleItems = []
                for(boardIndex in possibleBoardsTemp){
                    if(!possibleItems.includes(possibleBoardsTemp[boardIndex][rowIndex][collumnIndex])){
                        possibleItems.push(possibleBoardsTemp[boardIndex][rowIndex][collumnIndex])
                    }
                }
                numBoard[rowIndex][collumnIndex] = possibleItems.length
            }
        }
    }
    if(!foundBoard){
        var maxNumber = 0
        var maxNumRow = 2
        var maxNumCollumn = 1
        for(rowIndex in numBoard){
            for(collumnIndex in numBoard[rowIndex]){
                var currItm = numBoard[rowIndex][collumnIndex]
                if(parseInt(currItm)>parseInt(maxNumber)){
                    maxNumber = currItm
                    maxNumRow = parseInt(rowIndex)+1
                    maxNumCollumn = parseInt(collumnIndex)+1
                }
            }
        }
        document.getElementById(`r${maxNumRow}c${maxNumCollumn}`).src = "assets/" + "thisOne" + ".png"
    }
}

function imgClicked(row, collumn){
    if(!foundBoard && !alreadyOpen){
        alreadyOpen = true
        var modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['button'],
            closeLabel: "Close",
            cssClass: ['custom-class-1', 'custom-class-2'],
            onOpen: function() {
            },
            onClose: function() {
                alreadyOpen = false
                modal.destroy()
            },
            beforeClose: function() {
                return true
            }
        })
        possibleBoardsTemp = findBoards(currentBoard, possibleBoards)
        var possibleItems = []
        for(boardIndex in possibleBoardsTemp){
            if(!possibleItems.includes(possibleBoardsTemp[boardIndex][row-1][collumn-1])){
                possibleItems.push(possibleBoardsTemp[boardIndex][row-1][collumn-1])
            }
        }
        var htmlDropdown = "<select id='selectCardItem'  style='width: 100%;height: 40%;font-size:25px;'>"
        for(possibleItemIndex in possibleItems){
            switch (possibleItems[possibleItemIndex]) {
                case "m":
                    htmlDropdown += "<option value='m'>Mushroom</option>"
                    break;
                
                case "f":
                    htmlDropdown += "<option value='f'>Flower</option>"
                    break;

                case "v":
                    htmlDropdown += "<option value='v'>10 Coins</option>"
                    break;

                case "c":
                    htmlDropdown += "<option value='c'>20 Coins</option>"
                    break;

                case "s":
                    htmlDropdown += "<option value='s'>Star</option>"
                    break;


                case "u":
                    htmlDropdown += "<option value='u'>1-Up</option>"
                    break;

                default:
                    break;
            }
        }
        htmlDropdown += "</select>"
        modal.setContent(htmlDropdown)


        modal.addFooterBtn('Cancel', 'tingle-btn tingle-btn--danger', function() {
            modal.close()
        })
        modal.addFooterBtn('Submit', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
            currentBoard[row-1][collumn-1] = document.getElementById('selectCardItem').value
            possibleBoardsTemp = findBoards(currentBoard, possibleBoards)
            if(possibleBoardsTemp.length == 1){
                currentBoard = possibleBoardsTemp[0]
                foundBoard = true
            }
            console.log(currentBoard)
            console.log(possibleBoardsTemp)
            setPictures(currentBoard)
            modal.close()
        })

        modal.open()
    }
}

setPictures(currentBoard)
