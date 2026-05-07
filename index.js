const values = ["$5.00", "$10.00", "$25.00", "$50.00", "$75.00"]
const rarevalues = ["$100.00", "$250.00", "500.00", "$750.00", "$1000.00"]
const superrarevals = ["$2500", "$7500", "$10000"]
function genTicket(type) {
  let scratchticket = undefined;
  if (type == "ticket") {
    scratchticket = document.getElementById("grid-container");
  } else {
    scratchticket = document.getElementById("unscratched-grid-container");
  }
  let winningnums = undefined;
  if (type == "ticket") {
    winningnums = document.getElementById("topnums");
  } else {
    winningnums = document.getElementById("unscratchednums");
    console.log(winningnums)
  }
  let gridid = 1;
  for (let i=0;i<5;i++) {
    const col = document.createElement("div");
    col.className = "col";
    const winnum = document.createElement("div");
    if (type == "ticket") {
      winnum.className = "grid-small";
    } else {
      winnum.className = "grid-unscratched-small";
    }
    if (type == "ticket") {
      const number = document.createElement("p");
      const pronounce = document.createElement("p");
      //------------------------------------------------
      number.className = "grid-label-small";
      pronounce.className = "grid-label-small";
      //------------------------------------------------
      //for i in each column, if fully unique, let go
      //else notunique==true, reroll, recheck
      number.textContent = `${randint(1, 30)}`;
      pronounce.textContent = "JKL";
      //------------------------------------------------
      winnum.appendChild(number);
      winnum.appendChild(pronounce);
      winningnums.appendChild(winnum);
    } else {
      winnum.className = "grid-unscratched-small";
      winnum.addEventListener("mouseenter", (function () {awaitScratch=setTimeout(scratchTile(winnum), 2000)}));  
      //scratch needs adjusting for winnum   
    } 
      winningnums.appendChild(winnum);   
    for (let g=0;g<4;g++) {
      const grid = document.createElement("div");
      if (type == "ticket") {
        grid.className = "grid";
      } else {
        grid.className = "grid-unscratched";
      }
      if (type == "ticket") {
        grid.id = `grid${gridid}`;
        const number = document.createElement("p");
        const pronounce = document.createElement("p");
        const value = document.createElement("p");
        //--------------------------------------------------
        number.className = "grid-label";
        pronounce.className = "grid-label";
        value.className = "grid-label";
        //--------------------------------------------------
        number.textContent = `${randint(1,30)}`;
        pronounce.textContent = "JKL";
        value.textContent = `${choice(values)}`;
        //--------------------------------------------------
        grid.appendChild(number);
        grid.appendChild(pronounce);
        grid.appendChild(value);
        //--------------------------------------------------
      } else {
        grid.id = `unscratched-grid${gridid}`;
        grid.addEventListener("mouseenter", (function () {const awaitScratch=setTimeout(scratchTile(grid), 2000)}))
      }
      col.appendChild(grid);
      gridid += 1;
    }
    scratchticket.appendChild(col);
  }
}

function scratchTile(ele) {
  //console.log("scratch") 
  console.log(ele)
  const eleid = document.getElementById(ele.id)
  eleid.style.opacity = `${Number(eleid.style.opacity) - 0.1}`
}

function determineWin(){
  const temp = ""
}

function randint(min, max){
  return Math.floor(Math.random() * (max-min+1)) + min;
}

function choice(array) {
  return array[randint(0, array.length-1)]
}

function sleep(ms=0) {
  return new Promise(resolve => setTimeout(resolve,ms))
}