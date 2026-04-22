// DATA STORAGE
const carbonData = {
    transport: [],
    energy: [],
    food: []
};

// ===== FUNCTIONS =====

// Transport
function enterTransportData(){
    const input = document.getElementById("transportInput");
    let km = Number(input.value);

    if(isNaN(km) || km < 0){
        alert("Invalid input");
        return;
    }

    const emissions = km * 0.21;
    carbonData.transport.push(emissions);

    input.value = "";
    updateUI();
}

// Energy
function enterEnergyData(){
    const input = document.getElementById("energyInput");
    let kwh = Number(input.value);

    if(isNaN(kwh) || kwh < 0){
        alert("Invalid input");
        return;
    }

    const emissions = kwh * 0.5;
    carbonData.energy.push(emissions);

    input.value = "";
    updateUI();
}

// Food
function enterFoodData(){
    const diet = document.getElementById("foodInput").value;
    let emissions = 0;

    if(diet === "1") emissions = 200;
    else if(diet === "2") emissions = 400;
    else emissions = 600;

    carbonData.food.push(emissions);
    updateUI();
}

// Reset
function resetData(){
    carbonData.transport = [];
    carbonData.energy = [];
    carbonData.food = [];
    updateUI();
    drawChart();
}

// UI UPDATE
function updateUI(){
    const sum = arr => arr.reduce((a,b) => a + b, 0);

    const t = sum(carbonData.transport);
    const e = sum(carbonData.energy);
    const f = sum(carbonData.food);
    const total = t + e + f;

    document.getElementById("output").textContent = `
Transport: ${t.toFixed(2)} kg CO2
Energy: ${e.toFixed(2)} kg CO2
Food: ${f.toFixed(2)} kg CO2

Total: ${total.toFixed(2)} kg CO2
`;
}

// CHART
function drawChart(){
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,300,300);

    const sum = arr => arr.reduce((a,b) => a + b, 0);

    const data = [
        sum(carbonData.transport),
        sum(carbonData.energy),
        sum(carbonData.food)
    ];

    const colors = ["#2ecc71", "#3498db", "#9b59b6"];
    const total = data.reduce((a,b)=>a+b,0);

    let start = 0;

    data.forEach((val,i)=>{
        if(total === 0) return;

        const slice = (val/total)*2*Math.PI;

        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(150,150);
        ctx.arc(150,150,100,start,start+slice);
        ctx.fill();

        start += slice;
    });
}

// DARK MODE
const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
};

// ===== EVENT LISTENERS =====
document.getElementById("addTransport").onclick = enterTransportData;
document.getElementById("addEnergy").onclick = enterEnergyData;
document.getElementById("addFood").onclick = enterFoodData;

document.getElementById("reportBtn").onclick = () => {
    updateUI();
    drawChart();
};

document.getElementById("resetBtn").onclick = resetData;