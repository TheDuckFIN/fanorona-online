var Game = {
    canvas: document.getElementById("gameCanvas"),

    //border on the sides of the board
    border: 40,

    //the distance x or y between two pieces
    pieceDistance: 80,

    //piece settings
    blackPieceColor: "#483C32",
    whitePieceColor: "#E3DAC9",
    pieceRadius: 25,

    //piece array. 0 = empty, 1 = black, 2 = white
    pieces: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 2, 1, 0, 2, 1, 2, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2]
    ]
}

Game.start = function() {
    this.canvas.width = this.border * 2 + 8 * this.pieceDistance;
    this.canvas.height = this.border * 2 + 4 * this.pieceDistance;

    this.ctx = this.canvas.getContext("2d");

    this.interval = setInterval(this.update.bind(this), 20);

    window.addEventListener('mouseup', function (e) {
        /*
         * Code snippet from http://stackoverflow.com/a/18053642
         */
        var rect = Game.canvas.getBoundingClientRect();
        var x = Math.round(e.clientX - rect.left);
        var y = Math.round(e.clientY - rect.top);

        if (x >= 0 && y >= 0 && x <= Game.canvas.width && y <= Game.canvas.height) {
            Game.mouseClicked(x, y);
        }
    });

    this.update();
}

Game.update = function() {
    this.clear();
    this.drawBoard();

    for(var x = 0; x < 9; x++) {
        for(var y = 0; y < 5; y++) {
            if (this.pieces[y][x] == 0) continue;
            this.drawPiece(x, y, this.pieces[y][x] == 1);
        }
    }
}

Game.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.mouseClicked = function(x, y) {
    var pieceX = Math.round((x - this.border) / this.pieceDistance);
    var pieceY = Math.round((y - this.border) / this.pieceDistance);
    
    var pieceCoordsX = this.border + pieceX * this.pieceDistance;
    var pieceCoordsY = this.border + pieceY * this.pieceDistance;

    //how many pixels it's okay to miss
    var missClickMargin = 5;

    var leftBorder = pieceCoordsX - this.pieceRadius - missClickMargin;
    var topBorder = pieceCoordsY - this.pieceRadius - missClickMargin;
    var rightBorder = pieceCoordsX + this.pieceRadius + missClickMargin;
    var bottomBorder = pieceCoordsY + this.pieceRadius + missClickMargin;

    console.log("X: " + pieceX + ", Y: " + pieceY);

    if (x > leftBorder && y > topBorder && x < rightBorder && y < bottomBorder) {
        this.pieces[pieceY][pieceX] = 0;
    }
}

Game.drawBoard = function() {
    //draw the brown underboard
    this.ctx.fillStyle = "#E6BF83";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //set the width and color of the lines we will draw in the board
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#A0793D";

    //draw horizontal and vertical lines using rectancles
    for(var x = 0; x < 8; x++) {
        for(var y = 0; y < 4; y++) {
            this.ctx.strokeRect(this.border + x * this.pieceDistance, this.border + y * this.pieceDistance, this.pieceDistance, this.pieceDistance);
        }
    }

    //draw diagonal lines
    for(var x = 0; x < 4; x++) {
        for(var y = 0; y < 2; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.border + this.pieceDistance * 2 * x, this.border + this.pieceDistance * 2 * y);
            this.ctx.lineTo(this.border + this.pieceDistance * 2 * (x+1), this.border + this.pieceDistance * 2 * (y+1));
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.border + this.pieceDistance * 2 * (x+1), this.border + this.pieceDistance * 2 * y);
            this.ctx.lineTo(this.border + this.pieceDistance * 2 * x, this.border + this.pieceDistance * 2 * (y+1));
            this.ctx.stroke();
        }
    }
}

Game.drawPiece = function(x, y, isBlack) {
    var pieceColor = isBlack ? this.blackPieceColor : this.whitePieceColor;

    this.ctx.beginPath();
    
    //the circle
    this.ctx.arc(this.border + this.pieceDistance * x, this.border + this.pieceDistance * y, this.pieceRadius, 0, 2 * Math.PI, false);
    
    //fill the circle with piece color
    this.ctx.fillStyle = pieceColor;
    this.ctx.fill();
    
    //black outline for the circle
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
}
