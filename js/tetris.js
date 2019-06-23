var document, c =  document.getElementById("myCanvas"), ctx = c.getContext("2d"), console, window;

function Block(block, length) {
    this.block = block;
    this.xpos = 40;
    this.ypos = 0;
    this.length = length;
    this.width = 20; 
    this.height = 20;
    this.dict = {};
    
    this.dict['tShape'] = [[1, 1, 1],[0 , 1, 0],[0, 0 , 0]];

    this.dict['leftL'] = [[1, 0, 0], [1, 0, 0], [1,1,0]];

    this.dict['rightL'] = [[0, 0, 1], [0, 0, 1], [0,1,1]];

    this.dict["line"] = [[0, 1, 0], [0, 1, 0], [0,1,0], [0,1,0]];

    this.dict["square"] = [[0, 1, 1], [0, 1, 1], [0,0,0]];

    this.dict["leftz"] = [[1, 1, 0], [0, 1, 1], [0,0,0]];

    this.dict["rightz"] = [[0, 1, 1], [1, 1, 0], [0,0,0]]
    
    var self = this;
    document.onkeydown = function(e) {
        if (e.keyCode == 65 || e.keyCode == 37) {
            if (self.xpos >= 0 && self.ypos <= 340) {
                self.xpos -= 20;
                self.drawBlock();
            }
        }
        else if (e.keyCode == 68 || e.keyCode == 39) {
            if (self.xpos <= 100 && self.ypos <= 340) {
                self.xpos += 20;
                self.drawBlock();
            }
        } else if (e.keyCode == 83|| e.keyCode == 40) {
            if (self.ypos <= 340){
                self.ypos += 20;
                self.drawBlock();
            }
        }
    }
}

Block.prototype.drawBlock = function() {
    var count, prev;
    "use strict";
    ctx.clearRect(this.xpos, this.ypos-40, 100,100);
    prev = this.xpos;
    for (var i = 0; i < this.dict[this.block].length; i++) {
        this.xpos = prev;
        count = 0;
        for (var j = 0; j < this.dict[this.block][i].length; j++) {
            this.xpos += this.width;
            if (this.dict[this.block][i][j] === 1) {
                ctx.fillStyle = "red";
                ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
            }
            else {
                count += 1;
            }
        }
        if (count != 3) {
            this.ypos += this.height;
        }
    }
    this.xpos = prev;
    this.ypos -= 20 * (this.length - 1);
};

Block.prototype.dropBlock = function() {
    "use strict";
    var x, self = this;
    x = window.setInterval(function() {
        self.drawBlock();
        //this.ypos += self.height;
        if (self.ypos + (self.length - 1) * 20 >= 400) {
            window.clearInterval(x);
            console.log(self.xpos, self.ypos)
        }
    }, 500)
    
}


function BlockKeeper() {
    this.dict = {};
    
    this.dict['1'] = [[1, 1, 1],[0 , 1, 0],[0, 0 , 0]]; //t shape

    this.dict['2'] = [[1, 0, 0], [1, 0, 0], [1,1,0]]; //LeftL 

    this.dict['3'] = [[0, 0, 1], [0, 0, 1], [0,1,1]]; //rightL

    this.dict['4'] = [[0, 1, 0], [0, 1, 0], [0,1,0], [0,1,0]]; //line

    this.dict['5'] = [[0, 1, 1], [0, 1, 1], [0,0,0]]; //square

    this.dict['6'] = [[1, 1, 0], [0, 1, 1], [0,0,0]]; //leftz

    this.dict['7'] = [[0, 1, 1], [1, 1, 0], [0,0,0]]; //rightz
    
    this.blocks = []
}

var myBlock = new Block("tShape", 2);
myBlock.dropBlock();
var b = new BlockKeeper()

