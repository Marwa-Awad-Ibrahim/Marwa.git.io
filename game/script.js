
const CHEAT_REVEAL_ALL = false;

const ROWS_COUNT = 9;
const COLS_COUNT = 9;
const HEARTS_COUNT = 9;

var defeat = false;
var victory = false;

function Cell() {
    this.discovered = false;
    this.isHeart = false;
    this.hasBeenFlagged = false;
}

var cells = Array(ROWS_COUNT);
for (var row = 0; row < ROWS_COUNT; row++) {
    cells[row] = Array(COLS_COUNT);
    for (var col = 0; col < COLS_COUNT; col++) {
        cells[row][col] = new Cell();
    }
}


for (i = 0; i < HEARTS_COUNT; i++) {
    cells[Math.floor(Math.random() * ROWS_COUNT)][Math.floor(Math.random() * COLS_COUNT)].isHeart = true;
}


render();

function discoverCell(row, col) {
    if(row < 0 || row > ROWS_COUNT-1){
        return
    }
    if(col < 0 || col > COLS_COUNT-1){
        return
    }
    if(cells[row][col].discovered){
        return;
    }
    if(!cells[row][col].hasBeenFlagged){
    cells[row][col].discovered = true;}
    else{
        return;
    }
    if(cells[row][col].isHeart && cells[row][col].discovered){
        defeat = true;
    }

    let adjHearts = countAdjacentHearts(row, col);
    if(adjHearts > 0){
        return;
    }
    
    discoverCell(row,col-1);
    discoverCell(row-1,col);
    discoverCell(row+1,col);
    discoverCell(row,col+1);
}

function flagCell(row, col) {
    if(cells[row][col].hasBeenFlagged === true){
        cells[row][col].hasBeenFlagged = false;
    }
    else{
        cells[row][col].hasBeenFlagged = true;
    }
}

function countAdjacentHearts(row, col) {
    cells[row][col];
    let x = 0;
    for (i = row - 1; i <= row + 1; i++) {
        if(i < 0 || i > ROWS_COUNT-1){
            continue;
        }
        for(j = col -1; j<= col +1; j++){
            if(j < 0 || j > COLS_COUNT-1){
                continue;
            }
        if(cells[i][j].isHeart === true){
            x++;
        }
        }
    
    }
    return x;
}

function getHeartsCount() {  
    return HEARTS_COUNT;
}

function getClearedCells() {
    let ClearedCellCount = 0;
        for (let row = 0; row <= ROWS_COUNT-1; row++) {
            for (let col = 0; col <= COLS_COUNT-1; col++) {
                if (cells[row][col].discovered) {
                    ClearedCellCount++;
                }
            }
        }
    return ClearedCellCount;
}
   
function getTotalCellsToClear() {
    let TotalCellsToClear = (ROWS_COUNT * COLS_COUNT)-HEARTS_COUNT
    return TotalCellsToClear;
}

function checkForVictory() {
   let Clearcells = getClearedCells();
    let totalCells = getTotalCellsToClear();
    if(Clearcells === totalCells)
    victory = true;
   }


function getMessage() {
    if (victory == true) {
        return "Well done! 👏🏼<br><br>Refresh the page to start again.";
    } else if (defeat) {
        return "Ouch! 💔<br><br>Refresh the page to try again.";
    }
    return "";
}


function render() {
    var playfield = document.getElementById("playfield");
    var html = "";
    for (var row = 0; row < ROWS_COUNT; row++) {
        html += '<div class="row">';
        for (var col = 0; col < COLS_COUNT; col++) {
            var cell = cells[row][col];
            var cellText = "";
            var cssClass = "";
            var textColor = "";
            if (cell.discovered || CHEAT_REVEAL_ALL || defeat) {
                cssClass = "discovered";
                if (cell.isHeart) {
                    cellText = "❤️";
                } else {
                    var adjHearts = countAdjacentHearts(row, col);
                    if (adjHearts > 0) {
                        cellText = adjHearts.toString();
                        if (adjHearts == 1) {
                            textColor = "blue";
                        } else if (adjHearts == 2) {
                            textColor = "green";
                        } else if (adjHearts == 3) {
                            textColor = "red";
                        } else if (adjHearts == 4) {
                            textColor = "black";
                        }
                    }
                }
            } else {
                if (cell.hasBeenFlagged) {
                    cellText = "🚩"
                }
            }
            html += `<div class="cell ${cssClass}" style="color:${textColor}" onclick="onCellClicked(${row}, ${col}, event)">${cellText}</div>`;
        }
        html += "</div>"
    }
    playfield.innerHTML = html;

    var body = document.getElementsByTagName("body")[0];
    if (defeat) {
        body.classList.add("defeat")
    }

    if (victory) {
        body.classList.add("victory")
    }

    document.getElementById("hearts-count").innerText = getHeartsCount().toString();
    document.getElementById("cleared-cells-count").innerText = getClearedCells().toString();
    document.getElementById("total-cells-to-clear").innerText = getTotalCellsToClear().toString();

    // Update message
    document.getElementById("message").innerHTML = getMessage();
}

// This function gets called each time a cell is clicked. Arguments "row" and "col" will be set to the relevant
// values. Argument "event" is used to check if the shift key was held during the click.
function onCellClicked(row, col, event) {
    if (event.shiftKey) {
        flagCell(row, col);
    } else {
        discoverCell(row, col);
    }
    checkForVictory();
    render();
}