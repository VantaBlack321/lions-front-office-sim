// ======================================================
// LIONS GM SIMULATOR
// TESTING ONLY FOR CONSOLE / DEBUGGING
// ======================================================

console.log("This is a Lions GM Simulator")

const playerRoster = []

function addPlayer(name, position, age, overall) {
    const player = {
        name: name,
        position: position,
        age: age,
        overall: overall            
    }
    playerRoster.push(player)
}

addPlayer("Jared Goff", "QB", 32, 80)
addPlayer("Amon-Ra St. Brown", "WR", 25, 82)
addPlayer("D'Andre Swift", "RB", 28, 78)

console.log(playerRoster)

// ======================================================
// WEBSITE RENDERING / VISUAL DISPLAY
// ======================================================

// HTML id = gives an element a name
// document.getElementById("playerName") = JavaScript finds that HTML element
// .value = JavaScript grabs what the user typed
// addEventListener("click") = waits for the button click
// addPlayer(...) = uses the input values to create/store the player
// innerHTML = shows the result visually on the website

function renderRoster() {
    document.getElementById("rosterDisplay").innerHTML = `
        <ul>
            ${playerRoster.map(player => {
                return `<li>${player.name} - ${player.position} - Age: ${player.age}</li>`;
            }).join("")}
        </ul>
    `;
}

document.getElementById("runActionBtn").addEventListener("click", function() {
    const selectedAction = document.getElementById("actionSelect").value;

    if (selectedAction === "addPlayerBtn") {
        const nameInput = document.getElementById("playerName").value;
        const positionInput = document.getElementById("playerPosition").value;
        const ageInput = parseInt(document.getElementById("playerAge").value);

        addPlayer(nameInput, positionInput, ageInput);
        renderRoster();

    } else if (selectedAction === "RemovePlayerBtn") {

        const nameToRemove = document.getElementById("playerName").value;
        
        const index = playerRoster.findIndex(player => player.name === nameToRemove);

        if (index !== -1) {
        playerRoster.splice(index, 1);

        document.getElementById("rosterDisplay").innerHTML = `
            <ul>
                ${playerRoster.map(player => {
                    return `<li>${player.name} - ${player.position} - Age: ${player.age}</li>`;
                }).join("")}
            </ul>
        `;
    } else {
        alert("Player not found in roster.");
    }

    } else if (selectedAction === "ClearRosterBtn") {
        playerRoster.length = 0;
        renderRoster();
    }
});