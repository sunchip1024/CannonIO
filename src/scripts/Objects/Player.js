import * as THREE from "three";
import Engine from "../ThreeEngine/Engine/Engine.js";
import GameObject from "../ThreeEngine/Objects/GameObject.js";
import Input from "../ThreeEngine/Utils/Input.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Player extends GameObject{
    #isMine;
    constructor(isMine = false) {
        super(new THREE.Mesh());
        this.#isMine = isMine;

        const loader = new GLTFLoader();
        loader.load(
            "./models/player.glb",
            (glb) => {
                this.Mesh = glb.scene;
            }
        );
    }

    FixedUpdate() {
        this.#Move();
    }

    #Move() {
        const WALK_SPEED = 2;
        let moveDir = new THREE.Vector3(Input.GetHorizontal(), 0, Input.GetVertical());
        moveDir.addScalar(WALK_SPEED * Engine.FixedDeltaTime);
        this.Transform.Translate(moveDir);
    }
}