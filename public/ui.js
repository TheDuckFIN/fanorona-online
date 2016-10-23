function UI(width, height) {
    this.width = width;
    this.height = height;
    this.stage = new createjs.Stage("gameCanvas");
    this.stage.clear();
}

UI.prototype.init = function() {
    var rectSize = Math.round(Math.min((this.width - 100)/8, (this.height - 100) / 4));

    var underBoard = new createjs.Shape();
    underBoard.graphics.beginFill("#826644");
    underBoard.graphics.drawRect(10, 10, 20 + rectSize * 9, 20 + rectSize * 5);
    this.stage.addChild(underBoard);

    for(var x = 0; x < 8; x++) {
        for(var y = 0; y < 4; y++) {
            var boxShape = new createjs.Shape();
            boxShape.graphics.setStrokeStyle(4);
            boxShape.graphics.beginStroke("Brown");
            boxShape.graphics.drawRect(50 + rectSize * x, 50 + rectSize * y, rectSize, rectSize);

            this.stage.addChild(boxShape);
        }
    }

    var circSize = Math.round(rectSize / 4);

    for(var x = 0; x < 9; x++) {
        for(var y = 0; y < 5; y++) {
            var shape = new createjs.Shape();
            shape.graphics.setStrokeStyle(2);
            shape.graphics.beginStroke("Black");
            shape.graphics.beginFill("Gray");
            shape.graphics.drawCircle(50 + rectSize * x, 50 + rectSize * y, circSize);

            this.stage.addChild(shape);
        }
    }
    
    this.stage.update();
}