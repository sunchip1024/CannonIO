

let nickname = "None";

function Awake() {
    const button = document.querySelector("#enterButton");
    button.onclick = function() {
        const inputNickname = document.querySelector("#nickname").value;
        if(inputNickname === "") return;
        nickname = inputNickname;
        Start();
    }
}

function Start() {
    const LOBBY = document.querySelector("#login");
    const GAME_CANVAS = document.querySelector("#game-div");

    LOBBY.style.display = "none";
    GAME_CANVAS.style.display = "block";

    console.log(nickname);
}

Awake();