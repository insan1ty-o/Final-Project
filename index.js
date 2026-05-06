const values = ["$5.00", "$10.00", "$25.00", "$50.00", "$75.00", "$100.00"]
function genTicket(type) {
   const scratchticket = document.getElementById("grid-container");
   let gridid = 1;
   for (let i=0;i<5;i++) {
      const col = document.createElement("div");
      col.className = "col";
      for (let g=0;g<4;g++) {
        const grid = document.createElement("div");
        if (type == "ticket") {
          grid.className = "grid";
        } else {
          grid.className = "grid-unscratched";
        }
        grid.id = `grid${gridid}`
        if (type = "ticket") {
          const number = document.createElement("p")
          const pronounce = document.createElement("p")
          const value = document.createElement("p")
          //--------------------------------------------------
          number.className = "grid-label"
          pronounce.className = "grid-label"
          value.className = "grid-label"
          //--------------------------------------------------
          number.textContent = "num"
          pronounce.textContent = "JKL"
          value.textContent = `${choice(values)}`
          //--------------------------------------------------
          grid.appendChild(number)
          grid.appendChild(pronounce)
          grid.appendChild(value)
          //--------------------------------------------------
        } else {
          grid.onmouseover=`${scratchTile()}`;
        }
        col.appendChild(grid)
        gridid += 1;
     }
     scratchticket.appendChild(col);
   }
}

function scratchTile(ele) {
  console.log("scratch")
}

function randint(min, max){
  return Math.floor(Math.random() * (max-min+1)) + min;
}

function choice(array) {
  console.log(randint(0, array.length-1))
  return array[randint(0, array.length-1)]
}