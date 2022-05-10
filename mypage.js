$(
    function () {
        MARGIN = 2;
        BORDER = 3;

        var spaceHeight;
        var spaceWidth;
        // array for Tic Tac Toe board
        var spaces = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]
        //const BOARD = $('#board');
        var myTurn = true;
        var gameOver = false;

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
        var turnDisplay = $('<div id="whoseTurn">' + '</div>');
        $('#board').append(turnDisplay);
        $("#whoseTurn")
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

        function whoseTurn() {
        //displays current player
        if (myTurn) {
            $("#whoseTurn").html("Player 1, it is your turn")
        }
        else {
            $("#whoseTurn").html("Player 2, it is your turn")
        }


    }

        function play() {
        // places the mark on the board
        player1 = "X";
        player2 = "O";

        var currentMark;
        if (myTurn) {
            currentMark = player1;
        }
        else {
            currentMark = player2;
        }
        
        event.target.innerHTML = currentMark;
        
        console.log("Player has played " + currentMark);

        myTurn = !myTurn;
        whoseTurn();
    }


        return function (endFunction) {
    $(window).resize(resize);
    drawBoard();
    resize();
    whoseTurn();

}
    }()
);