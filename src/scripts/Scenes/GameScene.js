import Scene from "../ThreeEngine/Engine/Scene.js";
import Player from "../Objects/Player.js";
import GameObject from "../ThreeEngine/Objects/GameObject.js";
import * as THREE from "three";

export default class GameScene extends Scene {
    constructor() { 
        super("GameScene"); 

        const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.Material({color: "gray"}));
        const floor = new GameObject(floorMesh);
        floor.Transform.SetLocalPosition(new THREE.Vector3(0, -0.5, 0));
        floor.Transform.SetLocalRotation(new THREE.Vector3(-90, 0, 0));
        this.Add(floor);

        /*
        const player = new Player(this, true);
        this.AddObject(player);
        */
    }
}