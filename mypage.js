$(
    function () {
        MARGIN = 2;
        BORDER = 3; 

        var tileHeight;
        var tileWidth;
        var ticTacToe = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]

        var whoseTurn = [
            
        ]



        function resize() {
        extraSpace = MARGIN + BORDER;

        var windowWidth = Math.floor(parseInt($(window).width() - extraSpace));
        var windowHeight = Math.floor(parseInt($(window).height() - extraSpace));         
            $("#board").css(
                {
                    "width": windowWidth,
                    "height": windowHeight,
                    "border": "2px solid black"
                }
            );

            tileHeight = (windowHeight / 3);
            tileWidth = (windowWidth / 3);

            console.log("current width: " + windowWidth);
        }

        function drawBoard() {
            var board = $('#board');


        }


        return function (endFunction) {
            $(window).resize(resize);
            resize();

        }
    }()
);