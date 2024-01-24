import * as THREE from "three";

export default class Player {
    #Mesh;
    #isMine;

    #clock = new THREE.Clock;

    constructor(mesh, isMine = false) {
        if(mesh.constructor !== THREE.Mesh)  throw new Error("[ Player - Constructor(mesh, isMine) ] mesh parameter is must Mesh!");
        if(isMine.constructor !== Boolean)   throw new Error("[ Player - Constructor(mesh, isMine) ] isMine Parameter is must Boolean!");
        
        this.#Mesh = mesh;
        this.#isMine = isMine;
    }

    Translate(direction) {
        if(direction.constructor !== THREE.Vector3)  throw new Error("[ Player - Translate(direction) ] direction parameter is must Vector3!");

        const WALK_SPEED = 10;
        const DELTA_TIME = this.#clock.getDelta();
        let moveDir = direction;
        moveDir.normalize();
        moveDir.multiplyScalar(WALK_SPEED * DELTA_TIME);

        this.#Mesh.position.x += moveDir.x;
        this.#Mesh.position.y += moveDir.y;
        this.#Mesh.position.z += moveDir.z;
    }
}