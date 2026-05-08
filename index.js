const values = ["$5.00", "$10.00", "$25.00", "$50.00", "$75.00"]
const rarevalues = ["$100.00", "$250.00", "500.00", "$750.00", "$1000.00"]
const superrarevals = ["$2500", "$7500", "$10000"]
const pronounciations = [] //this needs key:value stuff
const winners = []
const listednums = []

function genTicket(type) {
  let scratchticket = undefined;
  let numid = 1
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
      number.textContent = `${randint(1, 30)}`;
      pronounce.textContent = "JKL";
      //------------------------------------------------  
      winnum.appendChild(number)
      winnum.appendChild(pronounce);
      winningnums.appendChild(winnum);
    } else {
      winnum.id = `numid-${numid}`;
      winnum.className = "grid-unscratched-small";
      winnum.addEventListener("mouseenter", (function (){awaitScratch=setTimeout(scratchTile(winnum), 2000)}));
      } 
      numid = numid+ 1;
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
        grid.addEventListener("mouseover", (function () {const awaitScratch=setTimeout(scratchTile(grid), 2000)}))
      }
      col.appendChild(grid);
      gridid += 1;
    scratchticket.appendChild(col);
  }
}}

function scratchTile(ele) {
  const eleid = document.getElementById(ele.id);
  const eleopacity = eleid.style.opacity;
  if (eleid.className == "grid-unscratched") {
    const gridclass = eleid.id.split("unscratched-")
    const moneycounter = document.getElementById("money")
    console.log(document.getElementById(gridclass[1]).textContent.split("$"))
    moneycounter.textContent = `$${Number(document.getElementById(gridclass[1]).textContent.split("$")[1]) + Number(moneycounter.textContent.split("$")[1])}.00`
  }
  if (eleid.style.opacity == "") {
    eleid.style.opacity = 1
  } else if (eleid.style.opacity == "0") {
    eleid.onmouseover = undefined;
  } else {
    eleid.style.opacity = `${eleid.style.opacity - 0.2}`
    console.log(ele)
  }
  
}

function calcWinnings(){
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