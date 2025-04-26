const container = document.createElement('div');
container.setAttribute("id", "container");
container.style.display = "flex";
container.style.flexWrap = "wrap";
container.style.width = "45vw";
container.style.height = "45vw";
container.style.margin = "0";

const body = document.querySelector("body");
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.justifyContent = "space-evenly";
body.style.alignItems = "center";
body.style.height = "100vh";
body.style.width = "100vw";
body.style.margin = "0";

container.display = "flex";

function drawGrid(density) {
    let aDiv;
    let widthPerc;
    for(let i = 0; i < (density**2); i++) {
        aDiv = document.createElement('div');
        widthPerc = (1/density)*100;
        aDiv.style.flexBasis = `${widthPerc}%`;
        aDiv.style.display = "flex";
        aDiv.style.justifyContent = "center";
        aDiv.style.alignItems = "center";
        aDiv.style.boxSizing = "border-box";
        aDiv.style.border = "1px solid black";
        aDiv.setAttribute("class","innerDiv");
        //aDiv.setAttribute("id",`Div:${i+1}`);

        //just some conteint to make it visible atm
        //aDiv.textContent = `Div: ${i+1}`;

        container.appendChild(aDiv);
    }
    body.appendChild(container);
}

const btn = document.createElement("button");
btn.setAttribute("id", "chooseBtn");
btn.textContent = "Choose number of squares per side";
btn.style.padding = "10px 20px";
btn.style.fontSize = "16px";
btn.style.backgroundColor = "#4CAF50"; // nice green
btn.style.color = "white";
btn.style.border = "none";
btn.style.borderRadius = "5px";
btn.style.cursor = "pointer";
btn.style.margin = "10px";
btn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
btn.style.transition = "background-color 0.3s";

btn.addEventListener("mouseover", () => {
    btn.style.backgroundColor = "#45a049"; // slightly darker green on hover
});

btn.addEventListener("mouseout", () => {
    btn.style.backgroundColor = "#4CAF50"; // original color
});


//body.insertBefore(btn, container);
body.appendChild(btn);

document.addEventListener("mouseover", (e) => {
    let target = e.target;
    if(target.classList.contains("innerDiv")) {
        if (target.classList.contains("innerDiv")) {
            //This if else is full ai slop
            if (!target.colorChanged) {
                // First time: set a random color
                target.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                target.colorChanged = true;
        
                // Save the original opacity
                const computedOpacity = window.getComputedStyle(target).opacity;
                target.originalOpacity = parseFloat(computedOpacity);
            } else {
                // Every other time: darken the color by 10%
                let currentColor = window.getComputedStyle(target).backgroundColor;
        
                // Darken function
                function darkenColor(color, percent) {
                    const rgb = color.match(/\d+/g).map(Number);
                    const newRgb = rgb.map(c => Math.max(0, Math.floor(c * (1 - percent / 100))));
                    return `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
                }
        
                let darkerColor = darkenColor(currentColor, 10);
                target.style.backgroundColor = darkerColor;
            }
        }        
    }
});
document.addEventListener("click", (e) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    let target = e.target;
    if(target.id === "chooseBtn") {
        let density = prompt("How many squares per side?");
        if (density > 100) {
            alert("please input sth <100 :)");
            return;
        }
        drawGrid(density);
    }
});
/*
document.addEventListener("mouseout", (e) => {
    let target = e.target;
    if (target.classList.contains("innerDiv")) {
        target.style.backgroundColor = ""; // Reset to default
    }
});
*/