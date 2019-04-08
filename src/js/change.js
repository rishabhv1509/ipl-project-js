function change(inp) {
    var container = document.getElementById("container");
    var count_container = document.getElementById("count-container");
    var extras_container = document.getElementById("extras-container");
    var economy = document.getElementById("economy-container");
    var pom = document.getElementById("player-of-match-container");
    switch (inp) {
        case 1: container.style.display = "none";
            count_container.style.display = "block";
            extras_container.style.display = "none";
            economy.style.display = "none";
            pom.style.display = "none";
            break;
        case 2: container.style.display = "block";
            count_container.style.display = "none";
            extras_container.style.display = "none";
            economy.style.display = "none";
            pom.style.display = "none";
            break;
        case 3: container.style.display = "none";
            count_container.style.display = "none";
            extras_container.style.display = "block";
            economy.style.display = "none";
            pom.style.display = "none";
            break;
        case 4: container.style.display = "none";
            count_container.style.display = "none";
            extras_container.style.display = "none";
            economy.style.display = "block";
            pom.style.display = "none";
            break;
        case 5: container.style.display = "none";
            count_container.style.display = "none";
            extras_container.style.display = "none";
            economy.style.display = "none";
            pom.style.display = "block";
            break;
    }
}
