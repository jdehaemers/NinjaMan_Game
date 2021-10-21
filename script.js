var world = [];
var clearToggle  = false;
var sushiToggle  = false;
var nigiriToggle = false;
var blockToggle  = false;
var legalMoves   = [1,1,1,1]
var sushiCount   = 0
var nigiriCount  = 0
var cellTypes    = ["block", 
                    "empty", 
                    "sushi",
                    "nigiri",
                    "ninjaman" ]

function generateWorldArray(x, y) {
    for(var j=0; j<y; j++) {
        var worldRow = [];
        for(var i=0; i<x; i++) {
            if(j===0 || j===y-1 || i===0 || i===x-1 || (i%3===0 && j%3===0)) {
                worldRow.push(0);
            } else {
                worldRow.push(1);
            }
        } 
        world.push(worldRow);
    }
    console.log(world)
    // var setBlocks = [[3,3], [12, 12]]
    // for(var n=0; n<30; n++) {
    //     var rand = Math.random();
    //     rand = Math.floor(rand*(x-2)*(y-2));
    //     var p = Math.floor(rand/(y-2));
    //     var q = rand%(x-2);
    //     world[p+1][q+1] = 0;
    // }
    for(var j=1; j<y-2; j++) {
        for(var i=1; i<x-2; i++) {
            if(((world[i][j] + world[i+1][j] + world[i][j+1] + world[i+1][j+1])===4)) {
                var z = Math.random();
                z = Math.floor(z*4);
                var a = Math.floor(z/2);
                var b = z%2;
                world[i+a][j+b] = 0;
            }
        } 
    }
    // console.log(world)
    renderWorld()
}

function scanUpdateQuadrant(x, y) {
    console.log(x, y);
}

function renderWorld() {
    for(var j=0; j<world.length; j++) {
        var row = document.createElement("div");
        document.getElementById("world").appendChild(row);
        row.classList.add("row");
        for(var i=0; i<world[0].length; i++) {
            var block = document.createElement("div");
            block.classList.add("cell");
            block.classList.add(cellTypes[world[j][i]]);
            block.setAttribute("onclick", "transformCell(this)");
            row.appendChild(block);
        }   
    }
}

function transformCell(cell) {
    var xPos = (cell.offsetLeft - document.getElementById("world").offsetLeft) / 50;
    var yPos = (cell.offsetTop  - document.getElementById("world").offsetTop)  / 50;
    if(xPos === 0 || xPos === world[0].length - 1 || yPos === 0 || yPos === world.length -1) {
        // Do nothing if on the edge
    } else if (clearToggle === true) {
        cell.classList.replace("block", "empty");
    } else if (sushiToggle === true) {
        cell.classList.replace("empty", "sushi");
    } else if (nigiriToggle === true) {
        cell.classList.replace("empty", "nigiri");
    }
}

function clearPaths(clearButton) {
    if(clearButton.innerText === "Clear Paths") {
        clearButton.innerText = "Finish";
        clearToggle = true;
    } else {
        clearButton.innerText = "Clear Paths";
        clearToggle = false;
    }
}

function dropSushi(sushiButton) {
    if(sushiButton.innerText === "Drop Sushi") {
        sushiButton.innerText = "Finish";
        sushiToggle = true;
    } else {
        sushiButton.innerText = "Drop Sushi";
        sushiToggle = false;
    }
}

function dropNigiri(nigiriButton) {
    if(nigiriButton.innerText === "Drop Nigiri") {
        nigiriButton.innerText = "Finish";
        nigiriToggle = true;
    } else {
        nigiriButton.innerText = "Drop Nigiri";
        nigiriToggle = false;
    }
}

var ninjaMan = {
    x: 1,
    y: 1
}

function drawNinjaMan() {
    // Move NinjaMan
    document.getElementById("ninjaMan").style.left = document.getElementById("world").offsetLeft + ninjaMan.x * 50 + "px";
    document.getElementById("ninjaMan").style.top  = document.getElementById("world").offsetTop  + ninjaMan.y * 50 + "px";
    
    // Update legal moves
    rowList = document.querySelectorAll(".row");
    if (rowList[ninjaMan.y-1].children[ninjaMan.x].classList.value === "cell block") {
        legalMoves[0] = 0;
    } else {
        legalMoves[0] = 1;
    }
    if (rowList[ninjaMan.y].children[ninjaMan.x+1].classList.value === "cell block") {
        legalMoves[1] = 0;
    } else {
        legalMoves[1] = 1;
    }
    if (rowList[ninjaMan.y+1].children[ninjaMan.x].classList.value === "cell block") {
        legalMoves[2] = 0;
    } else {
        legalMoves[2] = 1;
    }
    if (rowList[ninjaMan.y].children[ninjaMan.x-1].classList.value === "cell block") {
        legalMoves[3] = 0;
    } else {
        legalMoves[3] = 1;
    }

    var currentCell = rowList[ninjaMan.y].children[ninjaMan.x]
    // Remove any sushi
    if (currentCell.classList.value === "cell sushi") {
        currentCell.classList.replace("sushi", "empty");
        sushiCount++;
        document.getElementById("sushiCounter").innerText = "Sushi count: " + sushiCount;
    }
    // Remove any nigiri
    if (currentCell.classList.value === "cell nigiri") {
        currentCell.classList.replace("nigiri", "empty");
        nigiriCount++;
        document.getElementById("nigiriCounter").innerText = "Nigiri count: " + nigiriCount;
    } 
}

document.onkeydown = function(e) {
    if(e.key=="ArrowLeft"  && legalMoves[3] === 1) {
        ninjaMan.x--;
    }
    if(e.key=="ArrowRight" && legalMoves[1] === 1) {
        ninjaMan.x++;
    }
    if(e.key=="ArrowDown"  && legalMoves[2] === 1) {
        ninjaMan.y++;
    }
    if(e.key=="ArrowUp"    && legalMoves[0] === 1) {
        ninjaMan.y--;
    }
    drawNinjaMan()
} 

// Initializing functions
generateWorldArray(12,12)
drawNinjaMan()

