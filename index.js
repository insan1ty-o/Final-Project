const values = ["$5.00", "$10.00", "$25.00", "$50.00", "$75.00"]
const rarevalues = ["$100.00", "$250.00", "$500.00", "$750.00", "$1000.00"]
const superrarevals = ["$2500", "$7500", "$10000"]
const pronounciations = [] //this needs key:value stuff //<-------- forget about this
const winners = []
const listednums = []

function preloadData() {
  const money = document.getElementById("money");
  if (sessionStorage.length == 0) {
    sessionStorage.setItem("money", document.getElementById("money").textContent)
    sessionStorage.setItem("first", true)
  } else {
    money.textContent = sessionStorage.getItem("money")
  }
}

function genTicket(type, fresh) {
  let scratchticket = undefined;
  let winningnumbers = undefined;
  let numid = 1;
  if (type == "ticket") {
    scratchticket = document.getElementById("grid-container");
    winningnumbers = document.getElementById("topnums")
  } else { 
    scratchticket = document.getElementById("unscratched-grid-container");
    winningnumbers = document.getElementById("unscratchednums")
  }
  scratchticket.innerHTML = "";
  winningnumbers.innerHTML = "";
  

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
      number.textContent = `${randint(1, 50)}`;
      unique = false;
      while (unique == false) {
        if (!winners.includes(number.textContent) || winners.length == 0) {
          unique = true;
          winners.push(number.textContent);
        } else {
          number.textContent = `${randint(1, 50)}`;
        }
      }
      pronounce.textContent = "SVN";
      //------------------------------------------------  
      winnum.appendChild(number);
      winnum.appendChild(pronounce);
      winningnums.appendChild(winnum);
    } else {
        winnum.id = `numid-${numid}`;
        winnum.className = "grid-unscratched-small";
        winnum.addEventListener("mouseenter", (function (){const awaitScratch=setTimeout(scratchTile(winnum), 2000)}));
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
        value.id = "winningamount";
        //--------------------------------------------------
        number.textContent = `${randint(1,50)}`;
        unique = false;
        while (unique == false) {
          if (!listednums.includes(number.textContent) || listednums.length == 0) {
            unique = true;
            listednums.push(number.textContent);
          } else {
            number.textContent = `${randint(1, 50)}`;
          }
        }
        pronounce.textContent = "SVN";
        const chanceval = randint(1,100)
        if (chanceval <= 95) {
          value.textContent = `${choice(values)}`;
        } else if (chanceval > 95 && chanceval < 100) {
          value.textContent = `${choice(rarevalues)}`;
        } else {
          value.textContent = `${choice(superrarevals)}`;
        }
        
        //--------------------------------------------------
        grid.appendChild(number);
        grid.appendChild(pronounce);
        grid.appendChild(value);
        //--------------------------------------------------
      } else {
        grid.id = `unscratched-grid${gridid}`;
        grid.addEventListener("mouseover", (function () {const awaitScratch=setTimeout(scratchTile(grid), 2000)}));
      }
      col.appendChild(grid);
      gridid += 1;
    scratchticket.appendChild(col);
  }
}}

function scratchTile(ele) {
  const eleid = document.getElementById(ele.id);
  const eleopacity = eleid.style.opacity;
  const gridid = document.getElementById(`${eleid.id.split("unscratched-")[1]}`);
  const moneycounter = document.getElementById("money");
  const eleidCList = eleid.classList

  if (eleid.style.opacity == "") {
    eleid.style.opacity = 0.8;
  } else if (eleid.style.opacity == 0 && eleidCList.contains("scratched") == false && eleidCList.contains("grid-unscratched-small") == false){
      eleid.classList.add("scratched");
      calcWinnings(gridid);
  } else if (Number(ele.style.opacity) > 0) {
    eleid.style.opacity = `${eleid.style.opacity - 0.2}`;
  }
}

function calcWinnings(grid){
  const currentwinnings = sessionStorage.getItem("money")
  const moneycounter = document.getElementById("money")
  if (winners.includes(grid.children[0].textContent)) {
    const equation = Number(grid.children[2].textContent.split("$")[1]) + Number(moneycounter.textContent.split("$")[1]);
    sessionStorage.setItem("money", `$${equation}.00`);
    moneycounter.textContent = `$${equation}.00`;
    grid.style.color = "greenyellow"
  }
}

function newticket(){
  const money = document.getElementById("money");
  const hint = document.getElementById("tickethint")
  hint.style.visibility = "hidden"
  money.textContent = `$${Number(money.textContent.split("$")[1])- 100}.00`;
  sessionStorage.setItem("money", `${money.textContent}`)
  winners.splice(0, winners.length)
  listednums.splice(0, listednums.length)
  genTicket("ticket", "y");
  genTicket("scratch", "y");
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