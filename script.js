const inputElement = document.getElementById('guess');
let storedString = "";
const map = new Map();
const map2 = new Map();
let correctGuesses = 0;
let incorrectGuesses = 0;

inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        storedString = inputElement.value;
        storedString = normalizeChampName(storedString);
        if(map.get(storedString)) {
            if(map2.get(storedString)) 
                return;
            map.get(storedString).className = "revealed";
            correctGuesses++;
            document.getElementById("correct-display").innerHTML = correctGuesses;
            map2.set(storedString, 1);
        } else {
            console.log("False");
            incorrectGuesses++;
            document.getElementById("incorrect-display").innerHTML = incorrectGuesses;
        }
        inputElement.value = '';
    }
});

async function buildChampGrid() {
    fetch("https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json")
    .then(res => res.json()).then(data => {
        const champions = data.data;
        
        for(let champ in champions) {
            const name = champions[champ].id;
            const img = document.createElement("img");
            img.className = "shadow";
            img.src = `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${name}.png`;
            map.set(name.toLowerCase().replace(/['\s-]/g), img);
            document.body.appendChild(img);
        }
    });

    document.getElementById("score-display")
}

function normalizeChampName(name) {
    return name.toLowerCase().replace(/['\s-]/g, "");
}

buildChampGrid();