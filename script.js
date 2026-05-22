// ======================================================
// LIONS GM SIMULATOR
// TESTING ONLY FOR CONSOLE / DEBUGGING
// ======================================================

console.log("This is a Lions GM Simulator")

const playerRoster = []

// ======================================================
// PLAYER FUNCTIONS
// ======================================================

function addPlayer(name, position, age, overall) {
    const player = {
        name: name,
        position: position,
        age: age,
        overall: overall
    }

    playerRoster.push(player)
}

// Starting test players
addPlayer("Jared Goff", "QB", 32, 80)
addPlayer("Amon-Ra St. Brown", "WR", 25, 82)
addPlayer("D'Andre Swift", "RB", 28, 78)

console.log(playerRoster)

// ======================================================
// WEBSITE RENDERING / VISUAL DISPLAY
// ======================================================

// HTML id = gives an element a name
// document.getElementById(...) = JavaScript finds the HTML element
// .value = grabs the value typed by the user
// addEventListener(...) = waits for user interaction
// innerHTML = updates the website visually

function renderRoster() {
    document.getElementById("rosterDisplay").innerHTML = `
        <ul>
            ${playerRoster.map(player => {
                return `
                    <li>
                        ${player.name} - 
                        ${player.position} - 
                        Age: ${player.age} - 
                        Overall: ${player.overall}
                    </li>
                `;
            }).join("")}
        </ul>
    `;
}

// Show starting roster immediately
renderRoster()

// ======================================================
// ACTION SELECT SYSTEM
// ======================================================

document.getElementById("runActionBtn").addEventListener("click", function() {

    const selectedAction = document.getElementById("actionSelect").value;

    // ======================================================
    // ADD PLAYER
    // ======================================================

    // Grab values typed into the input fields
    // Add a new player object into the playerRoster array
    // Re-render the roster display using updated roster data

    if (selectedAction === "addPlayerBtn") {

        const nameInput = document.getElementById("playerName").value;

        const positionInput = document.getElementById("playerPosition").value;

        const ageInput = parseInt(
            document.getElementById("playerAge").value
        );

        const overallInput = parseInt(
            document.getElementById("playerOverall").value
        );

        addPlayer(
            nameInput,
            positionInput,
            ageInput,
            overallInput
        );

        renderRoster();

    // ======================================================
    // REMOVE PLAYER
    // ======================================================

    // Grab the player name typed into the input field
    // Find the matching player inside the playerRoster array
    // Remove the player from the array if found
    // Re-render the roster display

    } else if (selectedAction === "RemovePlayerBtn") {

        const nameToRemove =
            document.getElementById("playerName").value;

        const index = playerRoster.findIndex(
            player => player.name === nameToRemove
        );

        if (index !== -1) {
            playerRoster.splice(index, 1);
            renderRoster();

        } else {
            alert("Player not found in roster.");
        }

    // ======================================================
    // CLEAR ROSTER
    // ======================================================

    // Remove all players from the roster array
    // Clear the roster display on the website

    } else if (selectedAction === "ClearRosterBtn") {
        playerRoster.length = 0;
        renderRoster();
    }

});

// ======================================================
// ARRANGE SELECT SYSTEM
// ======================================================

document.getElementById("arrangeBtn").addEventListener("click", function() {
    const arrangeAction = document.getElementById("actionArrange").value;

    // Sort the playerRoster array based on the selected arrangement criteria

    // If "Age" is selected, sort players from youngest to oldest
    if (arrangeAction === "Age") {
        playerRoster.sort((a, b) => a.age - b.age);
        renderRoster();
    
    // If "Overall" is selected, sort players from highest to lowest overall rating
    } else if (arrangeAction === "Overall") {
        playerRoster.sort((a, b) => b.overall - a.overall);
        renderRoster();
    }
});