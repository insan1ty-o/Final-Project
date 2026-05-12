const values = ["$5.00", "$10.00", "$25.00", "$50.00", "$75.00"]
const rarevalues = ["$100.00", "$250.00", "$500.00", "$750.00", "$1000.00"]
const superrarevals = ["$2500", "$7500", "$10000"]
const pronounciations = [] //this needs key:value stuff
const winners = []
const listednums = []

function genTicket(type, fresh) {
  let scratchticket = undefined;
  if (sessionStorage.length == 0) {
    sessionStorage.setItem("money", document.getElementById("money").textContent)
  }
  let numid = 1;
  if (type == "ticket") {
    scratchticket = document.getElementById("grid-container");
  } else { 
    scratchticket = document.getElementById("unscratched-grid-container");
  }
  if (fresh == "y") {
    for (i=0;i<10;i++) {
      console.log(document.getElementsByClassName("col")[i]);
      if (type == "ticket") {
        document.getElementsByClassName("grid-small")[i].remove();
      } else {
        document.getElementsByClassName("grid-unscratched-small")[i].remove();
      }
      document.getElementsByClassName("col")[i].remove();
    }
    while (winners.length > 0) {
      winners.pop();
    }
    while (listednums.length > 0) {
      listednums.pop();
    }
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
      unique = false;
      while (unique == false) {
        if (!winners.includes(number.textContent) || winners.length == 0) {
          unique = true;
          winners.push(number.textContent);
        } else {
          number.textContent = `${randint(1, 30)}`;
        }
      }
      pronounce.textContent = "JKL";
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
        //--------------------------------------------------
        number.textContent = `${randint(1,30)}`;
        unique = false;
        while (unique == false) {
          if (!listednums.includes(number.textContent) || listednums.length == 0) {
            unique = true;
            listednums.push(number.textContent);
          } else {
            number.textContent = `${randint(1, 30)}`;
          }
        }
        pronounce.textContent = "JKL";
        const chanceval = randint(1,25)
        if (chanceval <= 21) {
          value.textContent = `${choice(values)}`;
        } else if (chanceval < 25 && chanceval > 20) {
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

  if (eleid.style.opacity == "") {
    eleid.style.opacity = 0.8;
  } else if (eleid.style.opacity == "0" && ! eleid.id == `numid-${eleid.id.split("numid-")[1]}`) {
    if (! eleid.classList.contains("scratched")) {
      eleid.classList.add("scratched");
      console.log("added");
    }
    calcWinnings(gridid);
  } else if (Number(ele.style.opacity) > 0) {
    eleid.style.opacity = `${eleid.style.opacity - 0.2}`;
  }
}

function calcWinnings(grid){
  const currentwinnings = sessionStorage.getItem("money")
  if (winners.contains(grid.children[0])) {
    sessionStorage.setItem("money", `$${Number(gridid.textContent.split("$")[1]) + Number(moneycounter.textContent.split("$")[1])}.00`)
  }
}

function newticket(){
  const money = document.getElementById("money");
  money.textContent = `$${Number(money.textContent.split("$")[1])- 25}.00`;
  genTicket("ticket", "y");
  genTicket("scratch", "y");
}

function changeMoneyColor(money){
  if (String(money)[0] == "-") {
    money
  }
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