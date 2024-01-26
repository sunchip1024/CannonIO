import * as THREE from "three";
import execute from "./scripts/Scenes/Game.js";
import GameWorld from "./scripts/Game/GameWorld.js";

let nickname = "None";
Awake();

function Awake() {
    const GAME_CANVAS = document.querySelector("#game-canvas");
    GAME_CANVAS.style.display = "none";
    
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
    const GAME_CANVAS = document.querySelector("#game-canvas");

    LOBBY.style.display = "none";
    GAME_CANVAS.style.display = "block";

    //execute();
    const world = new GameWorld();
    world.Start();
}

