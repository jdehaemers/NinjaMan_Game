var world = [];
var clearToggle  = false;
var sushiToggle  = false;
var nigiriToggle = false;
var blockToggle  = false;
var legalMoves   = [1,1,1,1]
var sushiCount   = 0
var nigiriCount  = 0

function renderWorldArray(x, y) {
    var worldRow = [];
    world = [];
    for(var i=0; i<x; i++) {
        worldRow.push(0);
    }
    for(var i=0; i<y; i++) {
        world.push(worldRow);
    }
    drawWorld()
}

function drawWorld() {
    var oldRows = document.querySelectorAll(".row");
    for(var r=0; r<oldRows.length; r++) {
        oldRows[r].remove();
    }
    for(var i=0; i<world.length; i++) {
        var row = document.createElement("div");
        document.getElementById("world").appendChild(row);
        row.classList.add("row");
        for(var j=0; j<world[0].length; j++) {
            var block = document.createElement("div");
            block.classList.add("cell");
            block.classList.add("block");
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
        rowList = document.querySelectorAll(".row");
        var row = rowList[1];
        cellList = row.children;
        cellList[1].classList.replace("block", "empty");
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

drawNinjaMan()

// This will describe how I scan to creat a new world

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