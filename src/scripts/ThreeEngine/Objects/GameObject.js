import * as THREE from "three";
import * as CANNON from "cannon-es";

export default class GameObject {
    /**
     * This Create new GameObject
     * @param {*} world - world object which put this object
     * @param {*} mesh  - mesh object which want to create
     * @param {*} physics - cannon physics body object 
     */
    constructor(world, mesh = undefined, physics = undefined) {
        if(world === undefined || world === null)
            throw new SyntaxError("[ GameObject ] GameObject must get world which object is put in!");

        this.world = world;
        this.mesh = mesh;
        this.physics = physics;
        this.#active = true;

        if(mesh !== undefined)   
            this.world.Add(this);
    }

    /**
     * This is run when world is started
     */
    Start() {
        if(this.constructor === GameObject)
            throw new SyntaxError("[ GameObject - Start() ] Class which inherit GameObject mus implement Start method!");
    }

    /**
     * This is run when world update routine is played
     */
    Update() {
        if(this.constructor === GameObject)
            throw new SyntaxError("[ GameObject - Update() ] Class which inherit GameObject mus implement Update method!");
    }

    Position() {
        if(this.mesh === undefined) {
            if(this.physics === undefined)
                throw new Error("[ GameObject - Position() ] there is no mesh and physics body!");
            else {
                const pos = this.physics.position;
                return {x: pos.x, y: pos.y, z: pos.z};
            }
        } else {
            const pos = this.mesh.position;
            return {x: pos.x, y: pos.y, z: pos.z};
        }
    }

    /**
     * Set Position of object
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     */
    SetPosition(x, y, z) {
        this.mesh.position.set(x, y, z);

        if(this.physics !== undefined)
            this.physics.position.set(x, y, z);
    }
    
    /**
     * Set Rotation of object
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     */
    SetRotation(x, y, z) {
        this.mesh.rotation.set(x, y, z);

        if(this.physics !== undefined)
            this.physics.quaternion.setFromEuler(x, y, z, "YXZ");
    }

    /**
     * Move Object
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     */
    Translate(x, y, z) {
        const currentPos = this.mesh.position;
        this.SetPosition(currentPos.x + x, currentPos.y + y, currentPos.z + z);
    }

    /**
     * Rotate Object
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     */
    Rotate(x, y, z) {
        const currentRot = this.mesh.rotation;
        this.SetRotation(currentRot.x + x, currentRot.y + y, currentRot.z + z);
    }

    #active;
    SetActive(active) { 
        this.#active = active; 

        if(active === true) this.Start();
    }
}