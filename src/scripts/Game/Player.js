import * as THREE from "three";
import * as CANNON from "cannon-es";
import * as Engine from "../ThreeEngine/ThreeEngine.js";

export default class Player extends Engine.ModelObject {
    constructor(world) {
        const playerPhysics = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 0, 0),
            shape: new CANNON.Box(new CANNON.Vec3(0.3, 0.5, 0.3)),
        });

        super(world, "./models/player.glb", playerPhysics);

        Engine.Input.AddGetKeyDownEvent("KeyZ", this.#SetPlayerMode);
        Engine.Input.AddGetKeyDownEvent("ShiftLeft", this.#SelectCannon);
        Engine.Input.AddGetKeyDownEvent("ShiftLeft", this.#FireCannon);
    }

    Start() {
        this.SetPosition(0, 5, 0);
        this.SetRotation(0, 0, 0);
    }

    Update() {

        if(this.#isCannonMode === true) {
            this.#FireCannon();
        } else {
            this.#MovePlayer();
        }
    }

    #isCannonMode = false;
    #selectedCannon = null;
    #closestCannon = null;

    // Change Player Control Mode
    #SetPlayerMode() {
        if(isCannonMode === false)
            isCannonMode = (selectedCannon !== null);
        else
            isCannonMode = false;
    }

    // move player by key-Input
    #MovePlayer() {
        const MOVE_SPEED = 10;

        let moveDir = new THREE.Vector3(Engine.Input.GetHorizontal(), 0, Engine.Input.GetVertical());
        if(moveDir.x === 0 && moveDir.z === 0)    return;

        moveDir.normalize();
        moveDir.multiplyScalar(MOVE_SPEED * Engine.World.deltaTime);
        this.Translate(moveDir.x, 0, moveDir.z);

        let rotY = Math.atan2(moveDir.x, moveDir.z);
        this.SetRotation(0, rotY, 0);
    }

    // Select Cannon which is closest from player
    #SelectCannon() {
        if(this.#closestCannon === null)    return;
        if(this.#selectedCannon !== null)   return;
        this.#selectedCannon = this.#closestCannon;
    }

    // Fire Cannon when playmode is cannon mode
    #FireCannon() {
        if(selectedCannon === null) return;
        if(isCannonMode === false)   return;

        // Fire Cannon
        throw new Error("[ Player - FireCannon() ] Not Implement Yet!");
    }
}