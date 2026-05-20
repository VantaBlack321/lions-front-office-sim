console.log("Hello, welcome to the Lions GM Simulator!");

const playerRoster = [];

function insertPlayer(Name, Position, Age, Overall) {
    console.log("Name: " + Name + ", Position: " + Position + ", Age: " + Age + ", Overall: " + Overall);
    playerRoster.push({
        Name: Name,
        Position: Position,
        Age: Age,
        Overall: Overall
    });
    // Here you would add code to actually insert the player into your data structure or database
}

insertPlayer("Jared Goff", "QB", "31", "80");
