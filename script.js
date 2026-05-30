// ======================================================
// LIONS GM SIMULATOR
// TESTING / DEBUGGING
// ======================================================

console.log("This is a Lions GM Simulator")

const playerRoster = []

// removedPlayers = cut / released / retired
const removedPlayers = []

// tradedPlayers = sent to another team
const tradedPlayers = []

// ======================================================
// PLAYER FUNCTIONS
// ======================================================

// Create a player object and store it inside the roster array
function addPlayer(name, position, age, overall, salary, unit) {
    const player = {
        name: name,
        position: position,
        age: age,
        overall: overall,
        salary: salary,
        unit: unit
    }

    playerRoster.push(player)
}

// ======================================================
// WEBSITE RENDERING / UI DISPLAY
// ======================================================

// HTML id = gives an HTML element a unique name
// document.getElementById(...) = finds an HTML element
// .value = grabs the value typed by the user
// addEventListener(...) = waits for user interaction
// innerHTML = updates the website display dynamically

const salaryCapMax = 301200000

// Show the starting roster immediately when the page loads
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
                        Salary: ${player.salary} -
                        Unit: ${player.unit}
                    </li>
                `;
            }).join("")}
        </ul>
    `;

    const averageOverallRating = totalOverallRating / playerRoster.length;
    if (playerRoster.length === 0) {
        print("N/A")
    }

    const totalOverallRating = playerRoster.reduce((total, player) => {
        return total + player.overall;
    }, 0);

    document.getElementById("averageOverallRating").innerText =
        `Average Overall Rating: ${averageOverallRating}`;
    
    const averageAge = playerRoster.reduce((total, player) => {
        return total + player.age;
    }, 0);

    document.getElementById("averageAges").innerText = 
        `Average Ages: ${averageAge}`;

    const totalSalaryCap = playerRoster.reduce((total, player) => {
        return total + player.salary;
    }, 0);

    const remainingSalaryCap = salaryCapMax - totalSalaryCap

    document.getElementById("remainingSalaryCap").innerText = 
        `Remaining Salary Cap: ${remainingSalaryCap}`;
}

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

        const unitInput = document.getElementById("playerUnit").value;

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

            const removedIndex = removedPlayers.findIndex(
                player => player.name === nameInput
            );

            if (removedIndex !== -1) {
                removedPlayers.splice(removedIndex, 1);
            }

            addPlayer(nameInput, positionInput, ageInput, overallInput, salaryInput, unitInput);

            renderRoster();
            renderRemovedPlayers();
}

    // ======================================================
    // REMOVE PLAYER
    // ======================================================

    // Grab the player name typed into the input field
    // Find the matching player inside the roster array
    // Remove the player if a match is found
    // Re-render the updated roster display

    } else if (selectedAction === "removePlayerBtn") {

        // Find the player's position/index inside the array
        const nameToRemove =
            document.getElementById("playerName").value;

        const index = playerRoster.findIndex(
            player => player.name === nameToRemove
        );

        // Remove the player from the roster array
        if (index !== -1) {
            const removedPlayer = playerRoster[index];

            const reasonInput = document.getElementById("removeReason").value;

            removedPlayer.remove = reasonInput;

            removedPlayers.push(removedPlayer);
            playerRoster.splice(index, 1);

            renderRoster();

            renderRemovedPlayers();

        } else {
            alert("Player not found in roster.");
        }

    // ======================================================
    // CLEAR ROSTER
    // ======================================================

    // Remove all players from the roster array
    // Clear the roster display on the website

    } else if (selectedAction === "clearRosterBtn") {
        playerRoster.length = 0;
        renderRoster();
    }

});

function renderRemovedPlayers() {
    document.getElementById("removedPlayersDisplay").innerHTML = `
        <ul>
            ${removedPlayers.map(player => {
                return `
                    <li>
                        ${player.name} -
                        ${player.position} -
                        Age: ${player.age} -
                        Overall: ${player.overall} -
                        Salary: ${player.salary} -
                        Unit: ${player.unit} -
                        Remove Reasons: ${player.remove}
                    </li>
                `;
            }).join("")}
        </ul>
    `;
}
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
    
    } else if (arrangeAction === "sortSalary") {
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

document.getElementById("editSalaryBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("playerName").value;
    const salaryInput = parseInt(document.getElementById("salaryCap").value);

    const playerToEdit = playerRoster.find(player => player.name === nameInput);

    if (playerToEdit) {
        const totalSalary = playerRoster.reduce((total, player) => {
            return total + player.salary;
        }, 0);

        const newTotalSalary = totalSalary - playerToEdit.salary + salaryInput;

        if (newTotalSalary > salaryCapMax) {
            alert("Unavailable: salary cap exceeded.");
        } else {
            playerToEdit.salary = salaryInput;
            renderRoster();
        }

    } else {
        alert("Player not found in roster.");
    }
});