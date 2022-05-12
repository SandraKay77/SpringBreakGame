$(
    function () {
        MARGIN = 2;
        BORDER = 3;

        var spaceHeight;
        var spaceWidth;
        // array for Tic Tac Toe board
        const spaces = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]
        //const BOARD = $('#board');
        const turnDisplay = ('<div id="statusDisplay">' + '</div>');
        const gamePlay = ['', '', '', '', '', '', '', '', ''];
        const player1 = "X";
        const player2 = "O";

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        var myTurn = false;
        var gameActive = false;
        var currentPlayer;


        function positionBoxes() {
            //adjusts position of boxes on the board

            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    var space = spaces[y][x]
                    if (space) {
                        space.css({
                            top: 150,
                            left: 150
                        });
                    }
                }
            }

        }
        function resize() {
            // adjusts size of board to keep with browser window size
            extraOutline = 2 * (MARGIN + BORDER);
            var space = $(".space");

            var windowWidth = Math.floor(parseInt($(window).width() - extraOutline));
            var windowHeight = Math.floor(parseInt($(window).height() - extraOutline));
            spaceHeight = (windowHeight / 3);
            spaceWidth = (windowWidth / 3);

            var fontSize = Math.min(spaceWidth, spaceHeight);
            //builds each individual block on the board


            space
                .width(spaceWidth - extraOutline)
                .height(spaceHeight - extraOutline)
                .css("fontSize", (0.5 * fontSize) + "px")
                .css("borderRadius", 5 + "px")
                .css("line-height", spaceHeight - extraOutline + "px")


            $("#board").css(
                {
                    "backgroundColor": "lightBlue",
                    "width": Math.floor(windowWidth),
                    "height": Math.floor(windowHeight)
                }
            );

            //displays whose turn it is

            $('#board').append(turnDisplay);
            $("#statusDisplay")
                .css(
                    {
                        "font-size": "2em",
                        "position": "absolute",
                        "top": "5%",
                        "width": "100%",
                        "text-align": "center",
                        "color": "white"
                    }
                );

            positionBoxes();

        }

        function drawBoard() {
            //creates board
            var board = $('#board');
            for (var y = 0; y < 3; y++) {
                for (var x = 0; x < 3; x++) {
                    var value = y * 3 + x + 1;
                    if (value < 10) {
                        var space = $('<div class="space", id=' + value + ' > ' + '</div > ');
                        board.append(space);
                        space.data("x", x).data("y", y);
                        space.click(play)
                        spaces[y][x] = space;
                        if (value % 2) {
                            space.css("backgroundColor", "lightGreen");
                        } else {
                            space.css("backgroundColor", "darkGreen");
                        }
                    }
                }
            }

        }

        function statusDisplay() {
            if (gameActive){
            //displays current player
            myTurn = !myTurn;
            if (myTurn) {
                currentPlayer = player1;
                $("#statusDisplay").html("X, it is your turn")
            }
            else {
                currentPlayer = player2;
                $("#statusDisplay").html("O, it is your turn")
            }}
            else {
                gameStart()
            }

        }

        function play() {
            // places the mark on the board
            if (gameActive) {
                
                currentBox = event.target;
                var currentMark;
                if (myTurn) {
                    currentMark = player1;
                }
                else {
                    currentMark = player2;
                }
                x = parseInt(currentBox.id - 1);
                if (gamePlay[x] === '') {
                    gamePlay.splice(x, 1, currentMark);
                    currentBox.innerHTML = currentMark;
                    console.log("you have played " + currentMark + " in array location number " + x);
                    console.log(gamePlay);
                    
                }
                else {
                    console.log("That is an invalid move")
                }

                resultValidation();
                statusDisplay();
            }
            
        }

        function resultValidation() {
            var roundWon = false;
            for (let i = 0; i < 8; i++) {
                const winCondition = winningConditions[i];
                let a = gamePlay[winCondition[0]];
                let b = gamePlay[winCondition[1]];
                let c = gamePlay[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;

                }
                if (a === b && b === c) {
                    roundWon = true;
                    break
                }
            }
            if (roundWon){
                gameWon();
            }
        }

        function gameStart() {
            $("#statusDisplay").append('Start a New Game?' + '<br>' + '<button id="playNow">' + 'Play now!' + '</button>');
            $("#playNow").click(newGame);
        }

        function newGame(){
            gameActive = true;
            $(".space").html("");
            statusDisplay();
        }

        function gameWon(){
            gameActive = false;
            $("#statusDisplay").html(currentPlayer + ' has won! <br>');

        }


        return function (endFunction) {
            $(window).resize(resize);
            drawBoard();
            resize();
            gameStart();

        }
    }()
);