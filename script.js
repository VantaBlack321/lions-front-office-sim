// ======================================================
// LIONS GM SIMULATOR
// TESTING / DEBUGGING
// ======================================================

console.log("This is a Lions GM Simulator")

// Active roster players currently on the team
const playerRoster = []

// removedPlayers = cut / released / retired players
const removedPlayers = []

// tradedPlayers = players sent to another team
const tradedPlayers = []

// ======================================================
// PLAYER FUNCTIONS
// ======================================================

// Create a player object and store it inside the active roster array
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

// Maximum salary cap allowed for the roster
const salaryCapMax = 301200000

// Rebuild the active roster display and update roster summary stats
function renderRoster() {
    document.getElementById("rosterDisplay").innerHTML = `
        <ul>
            ${playerRoster.map(player => {
                return `
                    <li>
                        ${player.name} - 
                        ${player.position} - 
                        Age: ${isNaN(player.age) ? "N/A" : player.age}
                        Overall: ${isNaN(player.overall) ? "N/A" : player.overall}
                        Salary: ${isNaN(player.salary) ? "N/A" : player.salary}
                        Unit: ${player.unit}
                    </li>
                `;
            }).join("")}
        </ul>
    `;

    const totalSalary = playerRoster.reduce((total, player) => {
    return total + (isNaN(player.salary) ? 0 : player.salary);
    }, 0);

    const remainingSalaryCap = salaryCapMax - totalSalary;

    document.getElementById("remainingSalaryCap").innerText =
        `Remaining Salary Cap: ${remainingSalaryCap}`;

    // Calculate total overall rating from all active players
    const totalOverallRating = playerRoster.reduce((total, player) => {
    return total + player.overall;
    }, 0);

    // Calculate total age from all active players
    const totalAge = playerRoster.reduce((total, player) => {
    return total + player.age;
    }, 0);

    // If there are no players, avoid showing NaN for averages
    if (playerRoster.length === 0) {
    document.getElementById("averageOverallRating").innerText =
        "Average Overall Rating: N/A";

    document.getElementById("averageAges").innerText =
        "Average Ages: N/A";

    } else {
    // Calculate averages only when the roster has players
    const averageOverallRating =
        totalOverallRating / playerRoster.length;

    const averageAge =
        totalAge / playerRoster.length;

    document.getElementById("averageOverallRating").innerText =
        `Average Overall Rating: ${averageOverallRating}`;

    document.getElementById("averageAges").innerText =
        `Average Ages: ${averageAge}`;
    }
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
    // Validate duplicates and salary cap
    // Add the new player into the active roster
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
        );

        const unitInput = document.getElementById("playerUnit").value;

        // Check if the player already exists in the active roster
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

            // If this player was previously removed, remove them from removedPlayers
            const removedIndex = removedPlayers.findIndex(
                player => player.name === nameInput
            );

            if (removedIndex !== -1) {
                removedPlayers.splice(removedIndex, 1);
            }

            // Add player back to the active roster
            addPlayer(nameInput, positionInput, ageInput, overallInput, salaryInput, unitInput);

            renderRoster();
            renderRemovedPlayers();
}

    // ======================================================
    // REMOVE PLAYER
    // ======================================================

    // Grab the player name typed into the input field
    // Find the matching player inside the active roster
    // Move the player into removedPlayers if found
    // Re-render the active and removed player displays

    } else if (selectedAction === "removePlayerBtn") {

        // Find the player's position/index inside the active roster array
        const nameToRemove =
            document.getElementById("playerName").value;

        const index = playerRoster.findIndex(
            player => player.name === nameToRemove
        );

        // If player exists, move them from active roster to removedPlayers
        if (index !== -1) {
            const removedPlayer = playerRoster[index];

            const reasonInput = document.getElementById("removeReason").value;

            // Store the removal reason on the removed player object
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

    // Remove all players from the active roster array
    // Re-render the active roster display

    } else if (selectedAction === "clearRosterBtn") {
        playerRoster.length = 0;
        renderRoster();

    // ======================================================
    // TRADE PLAYER
    // ======================================================

    // Move a player from the active roster into tradedPlayers
    // Store trade details like team, return, and reason

    } else if (selectedAction === "tradePlayerBtn") {
        const nameToTrade = document.getElementById("playerName").value;

        const index = playerRoster.findIndex(
            player => player.name === nameToTrade
        );

        if (index !== -1) {
            const tradedPlayer = playerRoster[index];

            const reasonInput = document.getElementById("tradeReason").value;
            const teamInput = document.getElementById("tradeTeam").value;
            const returnInput = document.getElementById("tradeReturn").value;

            // Add trade-specific information to the player object
            tradedPlayer.tradeReason = reasonInput;
            tradedPlayer.tradedTo = teamInput;
            tradedPlayer.tradeReturn = returnInput;

            tradedPlayers.push(tradedPlayer);
            playerRoster.splice(index, 1);

            renderRoster();
            renderTradedPlayers();

        } else {
            alert("Player not found in roster.");
        }
    }
});

// Render the removed players section
function renderRemovedPlayers() {
    document.getElementById("removedPlayersDisplay").innerHTML = `
        <ul>
            ${removedPlayers.map(player => {
                return `
                    <li>
                        ${player.name} -
                        ${player.position} -
                        Age: ${isNaN(player.age) ? "N/A" : player.age} -
                        Overall: ${isNaN(player.overall) ? "N/A" : player.overall} -
                        Salary: ${isNaN(player.salary) ? "N/A" : player.salary} -
                        Unit: ${player.unit} -
                        Remove Reason: ${player.remove || "N/A"}
                    </li>
                `;
            }).join("")}
        </ul>
    `;
}

// Render the traded players section
function renderTradedPlayers() {
    document.getElementById("tradedPlayersDisplay").innerHTML = `
        <ul>
            ${tradedPlayers.map(player => {
                return `
                    <li>
                        ${player.name} -
                        ${player.position} -
                        Age: ${isNaN(player.age) ? "N/A" : player.age} -
                        Overall: ${isNaN(player.overall) ? "N/A" : player.overall} -
                        Salary: ${isNaN(player.salary) ? "N/A" : player.salary} -
                        Unit: ${player.unit} -
                        Traded To: ${player.tradedTo || "N/A"} -
                        Trade Return: ${player.tradeReturn || "N/A"} -
                        Trade Reason: ${player.tradeReason || "N/A"}
                    </li>
                `;
            }).join("")}
        </ul>
    `;
}

// ======================================================
// ARRANGE SELECT SYSTEM
// ======================================================

document.getElementById("sortBtn").addEventListener("click", function() {
    
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
    
    // TODO: This option says sortSalary, but currently uses overall comparison
    } else if (arrangeAction === "sortSalary") {
        playerRoster.sort((a, b) => b.salary - a.salary);
        renderRoster();
    }
});

// ======================================================
// EDIT SYSTEM
// ======================================================

// Edit a player's position using the typed player name
document.getElementById("editPositionBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("playerName").value;
    const positionInput = document.getElementById("playerPosition").value;

    const playerToEdit = playerRoster.find(player => player.name === nameInput);

    if (playerToEdit) {
        playerToEdit.position = positionInput;
        renderRoster();
    } else {
        alert("Player not found in roster.");
    }
});

// Edit a player's age using the typed player name
document.getElementById("editAgeBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("playerName").value;
    const ageInput = parseInt(document.getElementById("playerAge").value);

    const playerToEdit = playerRoster.find(player => player.name === nameInput);

    if (playerToEdit) {
        playerToEdit.age = ageInput;
        renderRoster();
    } else {
        alert("Player not found in roster.");
    }
});

// Edit a player's overall rating using the typed player name
document.getElementById("editOverallBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("playerName").value;
    const overallInput = parseInt(document.getElementById("playerOverall").value);

    const playerToEdit = playerRoster.find(player => player.name === nameInput);

    if (playerToEdit) {
        playerToEdit.overall = overallInput;
        renderRoster();
    } else {
        alert("Player not found in roster.");
    }
});

// Edit a player's salary while still checking salary cap rules
document.getElementById("editSalaryBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("playerName").value;
    const salaryInput = parseInt(document.getElementById("salaryCap").value);

    const playerToEdit = playerRoster.find(player => player.name === nameInput);

    if (playerToEdit) {
        // Calculate current roster salary before changing this player's salary
        const totalSalary = playerRoster.reduce((total, player) => {
            return total + player.salary;
        }, 0);

        // Replace old salary with new salary to test if cap would be exceeded
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