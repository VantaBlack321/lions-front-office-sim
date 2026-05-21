// ======================================================
// LIONS GM SIMULATOR
// TESTING ONLY FOR CONSOLE / DEBUGGING
// ======================================================

console.log("This is a Lions GM Simulator")

const playerRoster = []

function addPlayer(name, position, age) {
    const player = {
        name: name,
        position: position,
        age: age
    }
    playerRoster.push(player)
}

addPlayer("Jared Goff", "QB", 32)
addPlayer("Amon-Ra St. Brown", "WR", 25)
addPlayer("D'Andre Swift", "RB", 28)

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

document.getElementById("addPlayerBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("playerName").value;
    const positionInput = document.getElementById("playerPosition").value;
    const ageInput = parseInt(document.getElementById("playerAge").value);

    addPlayer(nameInput, positionInput, ageInput);

    document.getElementById("rosterDisplay").innerHTML = `
    <ul>
        ${playerRoster.map(player => {
            return `<li>${player.name} - ${player.position} - Age: ${player.age}</li>`;
        }).join("")}
    </ul>
`;
});

