/**
 * Created by ekoodi on 28.3.2017.
 */
gameApp.playGame = (function () {
    var move = 7;
    var canvas = document.getElementById("gameCanvas");
    var heroTimer;
    var indexNumber = 0;

    function startNew() {
        gameApp.drawGame().startGame();
    }

    function moveCar() {
        if ((keyState == 38 || keyState == 87) || mouseState == "up") {
            if (player.y > 0)
                player.y = player.y - move;
            if (player.y < 0)
                player.y = 0;
        }

        if ((keyState == 40 || keyState == 83) || mouseState == "down") {
            if (player.y + player.height < canvas.height)
                player.y = player.y + move;
            if (player.y + player.height > canvas.height)
                player.y = canvas.height - player.height;
        }

        indexNumber++;
        // console.log("i: "+ indexNumber +"\n\rmover: " +mover);

        mover = setTimeout(moveCar, 20);

    }

    return {
        onStart: function () {
            if (youCanStartPlay) {
                youCanStartPlay = false;
                startNew();
            }
        },
        keyDown: function (e) {
            if (keyState == -1 && youCanStartPlay == false) { // needed becourse javaSript make threads
                keyState = (e.keyCode || e.which);
                moveCar();
            }
        },
        keyUp: function () {
            keyState = -1;
            clearTimeout(mover);
        },
        mouseDown: function (state) {
            if (mouseState == "free" && youCanStartPlay == false) {
                mouseState = state;
                moveCar();
            }
        },
        mouseUp: function () {
            clearTimeout(mover);
            mouseState = "free";
        }
    }

})();
