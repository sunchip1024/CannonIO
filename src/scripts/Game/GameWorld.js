import * as THREE from "three";
import * as Engine from "../ThreeEngine/ThreeEngine.js"
import Plane from "./Plane.js";
import Player from "./Player.js";

export default class GameWorld extends Engine.World {
    constructor() {
        super("Game");

        const floor = new Plane(this, "gray");
        floor.SetPosition(0, -0.5, 0);
        floor.SetRotation(-Math.PI / 2, 0, 0);

        //const player = new Player(this);

        /*
        this.camera.SetFollowedTarget({
            target: player,
            distance: 5,
            height: 2.5
        });
        */

        const camera = this.camera;
        camera.position.set(0, 2.5, -5);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}