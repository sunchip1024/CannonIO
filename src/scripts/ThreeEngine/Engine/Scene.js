import * as THREE from "three";
import GameObject from "../Objects/GameObject.js";
import Transform from "../Components/Transform.js";
import * as Utils from "../Utils/Utils.js";

export default class Scene {
    #hierarchyRoot = new GameObject("__HIERARCHY_ROOT__");

    constructor(name) {
        this.name = name;
        this.Scene = new THREE.Scene();

        const light = new THREE.DirectionalLight(0xffffff, 1);
        this.Scene.add(light);

        const AxesHelper = new THREE.AxesHelper(3);
        this.Scene.add(AxesHelper);
    }

    Add(gameobject) { 
        this.Scene.add(gameobject.Mesh);
        this.#hierarchyRoot.Transform.AddChild(gameobject.Transform);
    }
    
    /*
    // [[ Managing Object Method ]]
    AddObject(obj) {
        Utils.CheckType(obj, GameObject);
        this.#hierarchyRoot.Transform.AddChild(obj.Transform);
        this.#AddObjectToScene(obj.Transform);

        console.log(this.#scene);
    }

    #AddObjectToScene(obj) {
        Utils.CheckType(obj, Transform);
        this.#scene.add(obj.GetMesh());
        if(obj.GetChildren().length === 0)  return;
        obj.GetChildren().forEach((child) => this.#AddObjectToScene(child));
    }
    */

    // [[ Managing Object LifeCycle ]]
    Awake() { this.#hierarchyRoot.EngineAwake(); }
    Start() { this.#hierarchyRoot.EngineStart(); }
    Update() { this.#hierarchyRoot.EngineUpdate(); }
    FixedUpdate() { this.#hierarchyRoot.EngineFixedUpdate(); }
    LateUpdate() { this.#hierarchyRoot.EngineLateUpdate(); }
}