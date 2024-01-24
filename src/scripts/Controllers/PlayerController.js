import * as Controller from "./BasicController.js";
import Player from "../Objects/Player.js";
import * as THREE from "three";

export default class PlayerController extends Controller.BasicController {
    constructor(player) {
        if(player.constructor !== Player)    throw new Error("[ PlayerController - Constructor(player) ] player Parameter is must Player type!");
        super(player);

        console.log(this.keys);
    }

    HandleInput() {
        if(this.keys["ControlLeft"].IsPressed() === true)  { console.log("Player Jumped!"); }
        else if(this.keys["KeyZ"].IsPressed() === true) { console.log("Changed to Cannon Mode!"); }
        else {
            if(this.keys["ShiftLeft"].IsPressed() === true) { console.log("Player Carry Cannon!"); }

            let dir = new THREE.Vector3(0, 0, 0);
            if(this.keys["ArrowUp"].IsPressed() === true)      dir.z -= 1;
            if(this.keys["ArrowDown"].IsPressed() === true)    dir.z += 1;
            if(this.keys["ArrowLeft"].IsPressed() === true)    dir.x -= 1;
            if(this.keys["ArrowRight"].IsPressed() === true)   dir.x += 1;
            if(dir.x === 0 && dir.z === 0)    return;

            this.#MovePlayer(dir);
        }
    }

    #MovePlayer(direction) {
        if(direction.constructor !== THREE.Vector3)  throw new Error("[ PlayerController - MovePlayer(direction) ] direction parameter is must Vector3 type!");
        
        this.controller.Translate(direction);
    }
}