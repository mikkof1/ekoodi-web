/**
 * Created by ekoodi on 28.3.2017.
 */
gameApp.drawGame = function () {

    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");

    var roadImg = new Image();
    var mainImg = new Image();
    var playerImg = new Image();
    var coinImg = new Image();

    var gameOn = true;
    var newWalltimer = 0;
    var drawTimer;
    var timer;
    var pointsTime = 50;
    var points = 0;

    var evilWalls = [];
    var evilSpeed = 2;
    var safeHight = 80;

    var roadX = -10;
    var coin;


    function startGame() {
        player = gameApp.player(30, canvas.height / 2 - 25, 100, 50, "violet");
        coin = gameApp.player(-100, 0, 40, 40, "yellow");
        coinImg.src = "coin.png";
        playerImg.src = "car.png";
        roadImg.src = "road.png";
        points = 0;
        timer = setInterval(gameClock, 10);
        drawTimer = setInterval(draw, 10);
    }

    function endGame() {
        ctx.font = "100px Comic Sans MS";
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        youCanStartPlay = true;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        roadUpdate();
        evilUpdate();
        coinUpdate();
        playerUpdate();
        pointsUpdate();

        if (!gameOn) {
            // requestAnimationFrame(draw); // one way make a loop
            clearInterval(drawTimer);
            clearInterval(timer);
            endGame();
        }
    }

    function pointsUpdate() {
        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText("Points: " + points, 130, 20);
    }

    function gameClock() {
        if (newWalltimer < 0 && gameOn) {
            newWalltimer = Math.floor(Math.random() * 260) + 160;
            newEvilWall();
            if (coin.x + coin.width + 10 < 0)
                newCoin();
        }
        newWalltimer--;

        if (pointsTime <= 0 && gameOn) {
            pointsTime = 50;
            points++;
        }
        pointsTime--;
    }

    function roadUpdate() {
        roadX -= evilSpeed;
        if (roadX < -400)
            roadX = 0;

        ctx.drawImage(roadImg, roadX, 0);
    }

    function evilUpdate() {

        for (var i = 0; i < evilWalls.length; i++) {
            evilWalls[i].x -= evilSpeed;
            ctx.fillStyle = evilWalls[i].color;
            // upper wall
            ctx.fillRect(evilWalls[i].x, evilWalls[i].upperY, evilWalls[i].width, evilWalls[i].upperHeight);
            // downer wall
            ctx.fillRect(evilWalls[i].x, evilWalls[i].downerY, evilWalls[i].width, evilWalls[i].downerHeight);

            // hit the wall test
            var safeY1 = evilWalls[i].upperY + evilWalls[i].upperHeight;
            var safeY2 = evilWalls[i].downerY;
            var bumber = 3; // this or player container box

            var playerHitVertical = evilWalls[i].x <= player.x + player.width - bumber && evilWalls[i].x + evilWalls[i].width > player.x + bumber;
            if (playerHitVertical) {

                var playerHitHorizontal = player.y + bumber < safeY1 || player.y + player.height - bumber > safeY2;
                if (playerHitHorizontal) {
                    gameOn = false;
                }
            }

        } // for end

    } // evil update end

    function playerUpdate() {
        ctx.drawImage(playerImg, player.x, player.y);
    }

    function coinUpdate() {
        coin.x -= evilSpeed;
        ctx.drawImage(coinImg, coin.x, coin.y);

        var coinHorizontalHit = (coin.x <= player.x + player.width) && coin.x + coin.width > player.x;
        if (coinHorizontalHit) {

            var coinVerticalHit = player.y + player.height >= coin.y && player.y < coin.y + coin.height;
            if (coinVerticalHit) {
                points = points + 100;
                coin.x = -100;
            }
        }
    }

    function newCoin() {
        y = Math.floor(Math.random() * (canvas.height - 120)) + 60;
        console.log("coin y: " + y);
        x = canvas.width + Math.floor((Math.random() * 120)) + 180;
        coin.x = x;
        coin.y = y;
    }


    function newEvilWall() {
        var id = 0;
        safeHight = Math.floor((Math.random() * 120)) + player.height + 10;
        var upperHeight = Math.floor((Math.random() * (canvas.height - safeHight )));
        var downerY = upperHeight + safeHight;
        var downerHeigth = canvas.height - downerY;
        var color = "#848484";
        var width = 20; // Math.floor((Math.random() * 80))+5;

        for (var i = 0; i < evilWalls.length; i++) {
            if (evilWalls[i].x + evilWalls[i].width + 5 < 0) {
                id = evilWalls[i].id;
                break;
            }
        }
        if (id == 0) {
            id = evilWalls.length + 1;
        }

        var evil = gameApp.evilWall(id, canvas.width, 0, upperHeight, downerY, downerHeigth, width, color);

        if (evilWalls.length == evil.id - 1)
            evilWalls.push(evil);
        else
            evilWalls[evil.id - 1] = evil;
    }


    // Wait for main image
    function loadRoad(callback) {
        mainImg.onload = callback;
        mainImg.src = "road.png";
    }

    function drawMain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(mainImg, 0, 0);

        ctx.font = "90px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Blocker Game", canvas.width / 2, 170);

        ctx.font = "60px Comic Sans MS";
        ctx.fillStyle = "green";
        ctx.fillText("Push Start", canvas.width / 2, 280);
    }


    return {
        startGame: function () {
            startGame();
        },
        drawDefault: function () {
            loadRoad(drawMain);

        }

    }

}
