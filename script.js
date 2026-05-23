// ======================================================
// LIONS GM SIMULATOR
// TESTING / DEBUGGING
// ======================================================

console.log("This is a Lions GM Simulator")

const playerRoster = []

// ======================================================
// PLAYER FUNCTIONS
// ======================================================


// Create a player object and store it inside the roster array
function addPlayer(name, position, age, overall, salary) {
    const player = {
        name: name,
        position: position,
        age: age,
        overall: overall,
        salary: salary
    }

    playerRoster.push(player)
}

// Starting test players for the roster
addPlayer("Jared Goff", "QB", 32, 80, 150000)
addPlayer("Amon-Ra St. Brown", "WR", 25, 82, 130000)
addPlayer("D'Andre Swift", "RB", 28, 78, 120000)

console.log(playerRoster)

// ======================================================
// WEBSITE RENDERING / UI DISPLAY
// ======================================================

// HTML id = gives an HTML element a unique name
// document.getElementById(...) = finds an HTML element
// .value = grabs the value typed by the user
// addEventListener(...) = waits for user interaction
// innerHTML = updates the website display dynamically

const salaryCapMax = 301200000

// Rebuild the roster display using current playerRoster data
function renderRoster() {
    document.getElementById("rosterDisplay").innerHTML = `
        <ul>
            ${playerRoster.map(player => {
                return `
                    <li>
                        ${player.name} - 
                        ${player.position} - 
                        Age: ${player.age} - 
                        Overall: ${player.overall} - 
                        Salary: ${player.salary}
                    </li>
                `;
            }).join("")}
        </ul>
    `;
}

// Show the starting roster immediately when the page loads
renderRoster()

// ======================================================
// MAIN ACTION SYSTEM
// ======================================================

document.getElementById("runActionBtn").addEventListener("click", function() {

    // Get the selected action from the dropdown menu
    const selectedAction = document.getElementById("actionSelect").value;

    // ======================================================
    // ADD PLAYER
    // ======================================================

    // Grab player information from the input fields
    // Add the new player into the roster
    // Re-render the updated roster display

    if (selectedAction === "addPlayerBtn") {

        const nameInput = document.getElementById("playerName").value;

        const positionInput = document.getElementById("playerPosition").value;

        const ageInput = parseInt(
            document.getElementById("playerAge").value
        );

        const overallInput = parseInt(
            document.getElementById("playerOverall").value
        );

        const salaryInput = parseInt(
            document.getElementById("salaryCap").value
        )

        // Check if the player already exists in the roster
        const existingPlayer = playerRoster.find(player => player.name === nameInput);

        // Calculate current total salary before adding the new player
        const totalSalary = playerRoster.reduce((total, player) => {
            return total + player.salary;
        }, 0);

        // Prevent duplicate players from being added
        if (existingPlayer) {
            alert("Player already exists in roster.");

        // Prevent player from being added if salary cap would be exceeded
        } else if (totalSalary + salaryInput > salaryCapMax) {
            alert("Unavailable: salary cap exceeded.");

        // If all checks pass, add the player
        } else {
            addPlayer(nameInput, positionInput, ageInput, overallInput, salaryInput);
            renderRoster();
        }

    // ======================================================
    // REMOVE PLAYER
    // ======================================================

    // Grab the player name typed into the input field
    // Find the matching player inside the roster array
    // Remove the player if a match is found
    // Re-render the updated roster display

    } else if (selectedAction === "RemovePlayerBtn") {

        // Find the player's position/index inside the array
        const nameToRemove =
            document.getElementById("playerName").value;

        const index = playerRoster.findIndex(
            player => player.name === nameToRemove
        );

        // Remove the player from the roster array
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
    
    // Get the selected sorting option from the dropdown
    const arrangeAction = document.getElementById("actionArrange").value;

    // Sort the playerRoster array based on the selected arrangement criteria

    // Sort players from youngest to oldest
    if (arrangeAction === "sortAge") {
        playerRoster.sort((a, b) => a.age - b.age);
        renderRoster();
    
    // Sort players from highest overall to lowest overall
    } else if (arrangeAction === "sortOverall") {
        playerRoster.sort((a, b) => b.overall - a.overall);
        renderRoster();
    }
});

// ======================================================
// EDIT SYSTEM
// ======================================================

document.getElementById("editAgeBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("playerName").value;
    const ageInput = parseInt(document.getElementById("playerAge").value);

    const playerToEdit = playerRoster.find(player => player.name === nameInput);

    if (playerToEdit) {
        // Edit a player's age using the typed player name
        playerToEdit.age = ageInput;
        // Update the player's age and refresh the display
        renderRoster();
    } else {
        alert("Player not found in roster.");
    }
});

document.getElementById("editOverallBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("playerName").value;
    const overallInput = parseInt(document.getElementById("playerOverall").value);

    const playerToEdit = playerRoster.find(player => player.name === nameInput);

    if (playerToEdit) {
        // Edit a player's overall rating using the typed player name
        playerToEdit.overall = overallInput;
        // Update the player's overall rating and refresh the display
        renderRoster();
    } else {
        alert("Player not found in roster.");
    }
});