import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as CANNON from "cannon-es";
import GameObject from "./GameObject";

export default class ModelObject extends GameObject{
    static #gltfLoader = new GLTFLoader();
    static #objLoader = new OBJLoader();

    /**
     * This Create new 3D Model GameObject
     * @param {World} world - world object which put this object
     * @param {String} modelURL - model url
     * @param {CANNON.Body} physics - cannon physics body object 
     */
    constructor(world, modelURL, physics = undefined) {
        super(world, undefined, physics);
        this.SetActive(false);

        const modelType = modelURL.split('.').reverse()[0];

        if(modelType === "glb")
            ModelObject.#gltfLoader.load(modelURL, (glb) => ModelObject.OnModelLoadingSuccess(glb.scene, this), ModelObject.OnModelLoadingProgress, ModelObject.OnModelErrorOccur);
        else if(modelType === "obj")
            ModelObject.#objLoader.load(modelURL, (obj) => ModelObject.OnModelLoadingSuccess(obj, this), ModelObject.OnModelLoadingProgress, ModelObject.OnModelErrorOccur);
        else
            throw new TypeError("[ ModelObject - constructor(world, modelURL, physics) ] Model Type is allowed only glb or obj type!");
    }

    /**
     * This is run when world is started
     */
    Start() {
        if(this.constructor === ModelObject)
            throw new SyntaxError("[ ModelObject - Start() ] Class which inherit ModelObject mus implement Update method!");
    }

    /**
     * This is run when world update routine is played
     */
    Update() {
        if(this.constructor === ModelObject)
            throw new SyntaxError("[ ModelObject - Update() ] Class which inherit ModelObject mus implement Update method!");
    }

    /**
     * Set Object property when model loading is done
     * @param mesh - mesh from model object
     * @param {GameObject} obj - Object which add mesh
     */
    static OnModelLoadingSuccess(mesh, obj) {
        obj.mesh = mesh;
        obj.world.Add(obj);
        obj.SetActive(true);
    }

    static OnModelLoadingProgress() { }

    /**
     * This is occured when model loading error happened
     */
    static OnModelErrorOccur(err) { throw new Error("[ ModelObject ] An Error happend when model loads! (error : " + err + ")"); }
}