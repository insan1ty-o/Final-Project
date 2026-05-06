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
  const winningnums = document.getElementById("topnums");
  let gridid = 1;
  for (let i=0;i<5;i++) {
    const col = document.createElement("div");
    col.className = "col";
    if (type == "ticket") {
      const winnum = document.createElement("div")
      winnum.className = "grid-small";
      const number = document.createElement("p")
      const pronounce = document.createElement("p")
      //------------------------------------------------
      number.className = "grid-label-small";
      pronounce.className = "grid-label-small";
      //------------------------------------------------
      //while unique (flag variable), keep rerolling number
      number.textContent = `${randint(1, 30)}`;
      pronounce.textContent = "JKL";
      //------------------------------------------------
      winnum.appendChild(number)
      winnum.appendChild(pronounce)
      winningnums.appendChild(winnum)
    }
    for (let g=0;g<4;g++) {
      const grid = document.createElement("div");
      if (type == "ticket") {
        grid.className = "grid";
      } else {
        grid.className = "grid-unscratched";
      }
      grid.id = `grid${gridid}`
      if (type == "ticket") {
        const number = document.createElement("p")
        const pronounce = document.createElement("p")
        const value = document.createElement("p")
        //--------------------------------------------------
        number.className = "grid-label"
        pronounce.className = "grid-label"
        value.className = "grid-label"
        //--------------------------------------------------
        number.textContent = `${randint(1,30)}`;
        pronounce.textContent = "JKL"
        value.textContent = `${choice(values)}`
        //--------------------------------------------------
        grid.appendChild(number)
        grid.appendChild(pronounce)
        grid.appendChild(value)
        //--------------------------------------------------
      } else {
        grid.onmouseover=`${scratchTile(grid)}`;
      }
      col.appendChild(grid)
      gridid += 1;
    }
    scratchticket.appendChild(col);
  }
}

function scratchTile(ele) {
  console.log("scratch")
  //console.log(ele.style.opacity)
  //ele.style.opacity = Number(ele.style.opacity) - 20
}

function randint(min, max){
  return Math.floor(Math.random() * (max-min+1)) + min;
}

function choice(array) {
  console.log(randint(0, array.length-1))
  return array[randint(0, array.length-1)]
}