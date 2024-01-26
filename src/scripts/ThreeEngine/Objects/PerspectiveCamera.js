import * as THREE from "three";

export default class PerspectiveCamera {
    constructor({ fov, width, height, near, far }) {
        this.#camera = new THREE.PerspectiveCamera({
            fov: fov,
            aspect: width / height,
            near: near,
            far: far
        });
    }

    // Get Three Camera Object (for three renderer / scene)
    #camera = null;
    GetCamera() { return this.#camera; }

    // Set Camera Setting
    SetCamera({fov = undefined, width = undefined, height = undefined, near = undefined, far = undefined}) {
        if(width !== undefined || height !== undefined) SetSize({width: width, height: height});
        if(fov !== undefined)   this.#camera.fov = fov;
        if(near !== undefined)  this.#camera.near = near;
        if(far !== undefined)   this.#camera.far = far;
    }

    // Set Width and Height
    #width;
    #height;
    SetSize({width = undefined, height = undefined}) {
        if(width !== undefined)     this.#width = width;
        if(height !== undefined)    this.#height = height;

        this.#camera.aspect = this.#width / this.#height;
        this.#camera.updateProjectionMatrix();
    }


    // Set Target
    #targetOption = undefined;
    SetFollowedTarget({ target, distance, height }) { 
        this.#targetOption = {
            target: target,
            distance: distance,
            height: height
        }; 
    }

    // Camera Action in Update
    Update() {
        this.#FollowTarget();
    }

    // Move camera to target
    #FollowTarget() {
        if(this.#targetOption === undefined)   return;

        console.log(this.#targetOption);
        const targetPosition = this.#targetOption.target.Position();
        
        this.#camera.position.x = targetPosition.x;
        this.#camera.position.y = targetPosition.y + this.#targetOption.height;
        this.#camera.position.z = targetPosition.z + this.#targetOption.distance;

        this.#camera.lookAt(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z));
    }
}