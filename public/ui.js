function UI(width, height) {
    this.width = width;
    this.height = height;
    this.stage = new createjs.Stage("gameCanvas");
    this.stage.clear();
}

UI.prototype.init = function() {
    var rectSize = Math.round(Math.min((this.width - 100)/8, (this.height - 100) / 4));

    var underBoard = new createjs.Shape();
    underBoard.graphics.beginFill("#E6BF83");
    underBoard.graphics.drawRect(10, 10, 20 + rectSize * 9, 20 + rectSize * 5);
    this.stage.addChild(underBoard);

    for(var x = 0; x < 8; x++) {
        for(var y = 0; y < 4; y++) {
            var boxShape = new createjs.Shape();
            boxShape.graphics.setStrokeStyle(3);
            boxShape.graphics.beginStroke("#A0793D");
            boxShape.graphics.drawRect(50 + rectSize * x, 50 + rectSize * y, rectSize, rectSize);

            this.stage.addChild(boxShape);
        }
    }

    for(var x = 0; x < 4; x++) {
        for(var y = 0; y < 2; y++) {
            var lineLeft = new createjs.Shape();
            lineLeft.graphics.setStrokeStyle(3).beginStroke("#A0793D");
            lineLeft.graphics.moveTo(50 + rectSize * 2 * x, 50 + rectSize * 2 * y);
            lineLeft.graphics.lineTo(50 + rectSize * 2 * (x+1), 50 + rectSize * 2 * (y+1));
            this.stage.addChild(lineLeft);

            var lineRight = new createjs.Shape();
            lineRight.graphics.setStrokeStyle(3).beginStroke("#A0793D");
            lineRight.graphics.moveTo(50 + rectSize * 2 * (x+1), 50 + rectSize * 2 * y);
            lineRight.graphics.lineTo(50 + rectSize * 2 * x, 50 + rectSize * 2 * (y+1));
            this.stage.addChild(lineRight);
        }
    }

    var circSize = Math.round(rectSize / 4);

    for(var x = 0; x < 9; x++) {
        for(var y = 0; y < 5; y++) {
            var color = (y>2 || (y==2 && (x > 4 ? x%2==0 : x%2!=0))) ? "#E3DAC9" : "#483C32";
            if (y == 2 && x == 4) continue;

            var shape = new createjs.Shape();
            shape.graphics.setStrokeStyle(1);
            shape.graphics.beginStroke("Black");
            shape.graphics.beginFill(color);
            shape.graphics.drawCircle(50 + rectSize * x, 50 + rectSize * y, circSize);

            this.stage.addChild(shape);
        }
    }
    
    this.stage.update();
}