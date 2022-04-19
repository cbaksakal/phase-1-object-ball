function gameObject() {
    return {
        home: {
            teamName: "Brooklyn Nets",
            colors: ["Black", "White"],
            players: {
                "Alan Anderson": {
                    number: 0,
                    shoe: 16,
                    points: 22,
                    rebounds: 12,
                    assists: 12,
                    steals: 3,
                    blocks: 1,
                    slamDunks: 1,
                },
                "Reggie Evans": {
                    number: 30,
                    shoe: 14,
                    points: 12,
                    rebounds: 12,
                    assists: 12,
                    steals: 12,
                    blocks: 12,
                    slamDunks: 7,
                },
                "Brook Lopez": {
                    number: 11,
                    shoe: 17,
                    points: 17,
                    rebounds: 19,
                    assists: 10,
                    steals: 3,
                    blocks: 1,
                    slamDunks: 15,
                },
                "Mason Plumlee": {
                    number: 1,
                    shoe: 19,
                    points: 26,
                    rebounds: 12,
                    assists: 6,
                    steals: 3,
                    blocks: 8,
                    slamDunks: 5,
                },
                "Jason Terry": {
                    number: 31,
                    shoe: 15,
                    points: 19,
                    rebounds: 2,
                    assists: 2,
                    steals: 4,
                    blocks: 11,
                    slamDunks: 1,
                },
            }
        },
        away: {
            teamName: "Charlotte Hornets",
            colors: ["Turquoise", "Purple"],
            players: {
                "Jeff Adrien": {
                    number: 4,
                    shoe: 18,
                    points: 10,
                    rebounds: 1,
                    assists: 1,
                    steals: 2,
                    blocks: 7,
                    slamDunks: 2,
                },
                "Bismak Biyombo": {
                    number: 0,
                    shoe: 16,
                    points: 12,
                    rebounds: 4,
                    assists: 7,
                    steals: 7,
                    blocks: 15,
                    slamDunks: 10,
                },
                "DeSagna Diop": {
                    number: 2,
                    shoe: 14,
                    points: 24,
                    rebounds: 12,
                    assists: 12,
                    steals: 4,
                    blocks: 5,
                    slamDunks: 5,
                },
                "Ben Gordon": {
                    number: 8,
                    shoe: 15,
                    points: 33,
                    rebounds: 3,
                    assists: 2,
                    steals: 1,
                    blocks: 1,
                    slamDunks: 0,
                },
                "Brendan Haywood": {
                    number: 33,
                    shoe: 15,
                    points: 6,
                    rebounds: 12,
                    assists: 12,
                    steals: 22,
                    blocks: 5,
                    slamDunks: 12,
                },
            }
        }
    };
}

function recur(obj, property) {
    // intermediary variable to keep track of the results even inside nested loops.
    // We cannot use return right away because we have too many nested objects and
    // we need to check if not found to continue otherwise, return it.
    let result = null;

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            // console.log(key, result)
            if(key === property) {
                result = obj[key];
                break; // <-- found! break out
            } else {
                result = recur(obj[key], property);
                if(result)
                    break; // <---- important break out of the loop.
            }
        } else {
            continue;
        }
    } 

    return result;
}

function getPlayer(obj, property) {
    return recur(obj, property);
}

function numPointsScored(playerName) {
    return getPlayer(gameObject(), playerName).points;
}

function shoeSize(playerName) {
    return getPlayer(gameObject(), playerName).shoe;
}

function teamColors(teamName) {
    const obj = gameObject();
    for (const key in obj) {
        if (obj[key].teamName === teamName)
            return obj[key].colors;
    }
}

function teamNames() {
    const arr = [];
    const obj = gameObject();
    for (const key in obj)
        arr.push(obj[key].teamName);
    return arr;
}

function playerNumbers(teamName) {
    const arr = [];
    const obj = gameObject();
    for (const key in obj) {
        let team;
        if (obj[key].teamName === teamName) {
            team = obj[key];
            // console.log(team);
            for (const key in team) {
                let players;
                if (key === "players") {
                    players = team[key];
                    for (const key in players) {
                        arr.push(players[key].number);
                    }
                }
            }
        }
    }
    return arr;
}

function playerStats(playerName) {
    return getPlayer(gameObject(), playerName);
}

function getTeamPlayersAsArray(team) {
    const obj = gameObject();
    const players = obj[team]["players"];
    const playersAsArray = Object.entries(players).map(el => {
        // debugger;
        const obj = {};
        obj[el[0]] = el[1];
        return obj;
    });
    return playersAsArray;
}

function getAllPlayersAsArray() {
    return [...getTeamPlayersAsArray("home"), ...getTeamPlayersAsArray("away")];
}

function bigShoeRebounds() {
    const allPlayers = getAllPlayersAsArray();
    let playerWithMaxShoe = allPlayers[0];
    // debugger;
    allPlayers.forEach((el) => {
        if (Object.values(el)[0]["shoe"] > Object.values(playerWithMaxShoe)[0]["shoe"])
            playerWithMaxShoe = el;        
    });
    // console.log(playerWithMaxShoe);
    return Object.values(playerWithMaxShoe)[0]["rebounds"];
}

function mostPointsScored() {
    const allPlayers = getAllPlayersAsArray();
    let playerWithMostPoint = allPlayers[0];
    allPlayers.forEach((el) => {
        if (Object.values(el)[0]["points"] > Object.values(playerWithMostPoint)[0]["points"])
        playerWithMostPoint = el;        
    });
    return playerWithMostPoint;
}

function winningTeam() {
    const homePlayers = getTeamPlayersAsArray("home");
    const awayPlayers = getTeamPlayersAsArray("away");

    const homePts = homePlayers.reduce((acc, current) => acc + Object.values(current)[0]["points"], 0);
    const awayPts = awayPlayers.reduce((acc, current) => acc + Object.values(current)[0]["points"], 0);

    debugger;
    return homePts > awayPts ? gameObject()["home"]["teamName"] : gameObject()["away"]["teamName"];
}

function playerWithLongestName() {
    const plNamesHome = Object.keys(gameObject()["home"]["players"]);
    const plNamesAway = Object.keys(gameObject()["away"]["players"]);
    const allNames = [...plNamesHome, ...plNamesAway];
    let longestName = "";
    allNames.forEach(el => {
        if (el.length > longestName.length)
            longestName = el;
    });
    return longestName;
}

function doesLongNameStealATon() {
    const longName = getPlayer(gameObject(), playerWithLongestName());
    const allPlayers = getAllPlayersAsArray();
    let stealsATon = true;
    debugger
    for (const el of allPlayers) {
        if (longName["steals"] < Object.values(el)[0]["steals"]) {
            stealsATon = false;
            break;
        }
    }
    return stealsATon;
}

/*
console.log("Reggie Evans, points: ", numPointsScored("Reggie Evans"));
console.log("Ben Gordon, shoeSize: ", shoeSize("Ben Gordon"));
console.log("Brooklyn Nets, team color: ", teamColors("Brooklyn Nets"));
console.log("Charlotte Hornets, team color: ", teamColors("Charlotte Hornets"));
console.log("Team names: ", teamNames());
console.log("Charlotte Hornets, numbers: ", playerNumbers("Charlotte Hornets"));
*/
// console.log(playerStats("Brendan Haywood"));

// console.log(getTeamPlayersAsArray("away"));
// console.log(getAllPlayersAsArray());
// console.log(bigShoeRebounds());
// console.log(mostPointsScored());

// console.log(winningTeam());
// console.log(playerWithLongestName());
console.log(doesLongNameStealATon());

