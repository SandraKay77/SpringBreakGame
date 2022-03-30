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

        var whoseTurn = [

        ]




        function positionBoxes() {

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

            var windowWidth = Math.floor(parseInt($(window).width() - extraOutline));
            var windowHeight = Math.floor(parseInt($(window).height() - extraOutline));


            spaceHeight = (windowHeight / 3);
            spaceWidth = (windowWidth / 3);

            var fontSize = Math.min(spaceWidth, spaceHeight);
            $(".space")
                .width(spaceWidth - extraOutline)
                .height(spaceHeight - extraOutline)
                .css("fontSize", (0.8 * fontSize) + "px")
                .css("borderRadius", 5 + "px")

            $("#board").css(
                {
                    "backgroundColor": "lightBlue",
                    "width": Math.floor(windowWidth),
                    "height": Math.floor(windowHeight)
                }
            );
            positionBoxes();
            //console.log("current width: " + windowWidth);
        }

        function drawBoard() {
            var board = $('#board');
                for (var y = 0; y < 3; y++) {
                    for (var x = 0; x < 3; x++) {
                    var value = y * 3 + x + 1;
                    if (value < 10) {
                        var space = $('<div class="space">' + '</div>');
                        board.append(space);
                        space.data("x", x).data("y", y);
                        spaces[y][x] = space;
                        if(value % 2)  {
                            space.css("backgroundColor", "lightGreen");
                        } else {
                            space.css("backgroundColor", "darkGreen");
                        }
                    }
                }
            }
        }
        
  


        return function (endFunction) {
            $(window).resize(resize);
            drawBoard();
            resize();

        }
    }()
);